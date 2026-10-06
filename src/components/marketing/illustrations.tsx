"use client";

import * as React from "react";
import Image from "next/image";

/**
 * 01. CAMPUS WALKING DISCUSSION (Problem Section)
 * Exact user illustration: Two students walking across campus discussing placement intel.
 */
export function RumourNoiseScene({ className }: { className?: string; isCrossedOut?: boolean }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/campus-walking.png"
        alt="Two students walking on campus"
        width={583}
        height={417}
        priority
        className="w-full h-auto max-h-[380px] object-contain select-none"
      />
    </div>
  );
}

/**
 * 02. DESK INTERVIEW NOTES (Discovery Section)
 * Exact user illustration: Two students sitting across desk with laptop and notes.
 */
export function DocumentingExperienceScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/desk-interview-notes.png"
        alt="Two students at desk with laptop and interview notes"
        width={721}
        height={440}
        priority
        className="w-full h-auto max-h-[380px] object-contain select-none"
      />
    </div>
  );
}

/**
 * 03. ROUND TABLE CONSENSUS DISCUSSION (Verification Model)
 * Exact user illustration: Two students at round cafe table reviewing notes over coffee.
 */
export function VerificationCompareScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/round-table-discussion.png"
        alt="Two students at round table reviewing interview notes"
        width={463}
        height={412}
        priority
        className="w-full h-auto max-h-[380px] object-contain select-none"
      />
    </div>
  );
}

/**
 * 04. MENTOR MENTEE COLLABORATION VIGNETTE (Connect Hero & Conversation)
 * Exact user illustration: Two people collaborating at laptop with star speech bubble.
 */
export function PlacedConnectingScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/mentor-mentee-pair.png"
        alt="Candidate and mentor collaborating at laptop"
        width={380}
        height={222}
        priority
        className="w-full h-auto max-h-[340px] object-contain select-none"
      />
    </div>
  );
}

export function AlumniConversationGroupScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/desk-interview-notes.png"
        alt="Alumni and student dialogue"
        width={721}
        height={440}
        className="w-full h-auto max-h-[380px] object-contain select-none"
      />
    </div>
  );
}

export function PeopleSharingScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/round-table-discussion.png"
        alt="Students sharing experiences"
        width={463}
        height={412}
        className="w-full h-auto max-h-[360px] object-contain select-none"
      />
    </div>
  );
}

export function PassingTheTorchScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/campus-walking.png"
        alt="Experience passed forward"
        width={583}
        height={417}
        className="w-full h-auto max-h-[360px] object-contain select-none"
      />
    </div>
  );
}

export function SubmitExperienceScene({ className }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden select-none flex items-center justify-center ${className || ""}`}>
      <Image
        src="/assets/desk-interview-notes.png"
        alt="Student interview submission"
        width={721}
        height={440}
        className="w-full h-auto max-h-[360px] object-contain select-none"
      />
    </div>
  );
}

export function Stage01Vignette({ className }: { className?: string }) {
  return null;
}

export function Stage02Vignette({ className }: { className?: string }) {
  return null;
}

export function Stage03Vignette({ className }: { className?: string }) {
  return null;
}
