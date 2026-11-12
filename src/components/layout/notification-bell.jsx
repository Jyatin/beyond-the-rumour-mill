"use client";

import * as React from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import { 
  markNotificationReadAction, 
  markAllNotificationsReadAction 
} from "@/server/actions/notifications";
import Link from "next/link";

export function NotificationBell({ initialNotifications = [], initialUnreadCount = 0 }) {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(initialNotifications);
  const [unreadCount, setUnreadCount] = React.useState(initialUnreadCount);
  const [loading, setLoading] = React.useState(false);

  const dropdownRef = React.useRef(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await markNotificationReadAction(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readAt: new Date() } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setLoading(true);
      await markAllNotificationsReadAction();
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, readAt: new Date() }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all read:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-foreground/80 hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-bold text-white shadow-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border bg-card p-4 shadow-xl z-50 animate-in fade-in-50 zoom-in-95">
          <div className="flex items-center justify-between border-b pb-2.5 mb-3">
            <h4 className="font-semibold text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={loading}
                className="text-[11px] text-[var(--brand)] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <CheckCheck className="size-3" /> Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto space-y-2.5 divide-y divide-border/40">
              {notifications.map((notif) => {
                const isUnread = !notif.readAt;
                return (
                  <div
                    key={notif.id}
                    className={`pt-2.5 first:pt-0 flex items-start justify-between gap-2.5 rounded-lg p-2 transition-colors ${
                      isUnread ? "bg-muted/60" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <Link
                        href={notif.href || "/profile"}
                        onClick={() => setOpen(false)}
                        className="block"
                      >
                        <p className="text-xs font-semibold leading-tight text-foreground">
                          {notif.title}
                        </p>
                        <p className="text-[11.5px] text-muted-foreground mt-0.5 leading-snug">
                          {notif.body}
                        </p>
                        <span className="text-[10px] text-muted-foreground/70 font-mono mt-1 block">
                          {new Date(notif.createdAt).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </Link>
                    </div>

                    {isUnread && (
                      <button
                        onClick={(e) => handleMarkAsRead(notif.id, e)}
                        title="Mark as read"
                        className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors shrink-0 cursor-pointer"
                      >
                        <Check className="size-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
