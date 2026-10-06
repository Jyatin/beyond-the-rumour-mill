import { notFound } from "next/navigation";
import { getCompanyIntelligence } from "@/server/queries/companies";
export default async function CompanyPage({
  params
}) {
  const data = await getCompanyIntelligence(params.id);
  if (!data) return notFound();
  return <div className="container max-w-5xl py-12 md:py-16">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12 border-b pb-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {data.company.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
              {data.company.industry}
            </span>
            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-muted-foreground">
              {data.company.experienceCount} Experiences
            </span>
          </div>
          <div className="pt-2">
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Real interview experiences, questions, and insights shared by verified candidates.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Interview Process / Rounds */}
          <section className="space-y-6">
            <h2 className="font-editorial text-2xl tracking-tight">Interview Process</h2>
            {data.rounds.length > 0 ? <div className="space-y-4">
                {data.rounds.map((round, idx) => <div key={round.id || idx} className="p-4 border border-border rounded-xl bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{round.typeName || "Interview Round"}</h3>
                      {round.difficulty && <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                          {round.difficulty}
                        </span>}
                    </div>
                    {round.summary && <p className="text-sm text-muted-foreground">{round.summary}</p>}
                  </div>)}
              </div> : <p className="text-muted-foreground italic">No interview process data yet.</p>}
          </section>

          {/* Topics */}
          <section className="space-y-6">
            <h2 className="font-editorial text-2xl tracking-tight">Key Topics</h2>
            {data.company.topTopics && data.company.topTopics.length > 0 ? <div className="flex flex-wrap gap-2">
                {data.company.topTopics.map((t, idx) => <span key={idx} className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
                    {t.topic} ({t.pct}%)
                  </span>)}
              </div> : <p className="text-muted-foreground italic">No topic data available.</p>}
          </section>

          {/* Questions */}
          <section className="space-y-6">
            <h2 className="font-editorial text-2xl tracking-tight">Questions Asked</h2>
            {data.questions.length > 0 ? <div className="space-y-3">
                {data.questions.map((q, idx) => <div key={q.id || idx} className="p-4 border rounded-lg bg-card">
                    <p className="font-medium mb-2">{q.text}</p>
                    <div className="flex gap-2">
                      {q.topic && <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
                          {q.topic}
                        </span>}
                      {q.difficulty && <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                          {q.difficulty}
                        </span>}
                    </div>
                  </div>)}
              </div> : <p className="text-muted-foreground italic">No questions reported yet.</p>}
          </section>

          {/* Experiences */}
          <section className="space-y-6">
            <h2 className="font-editorial text-2xl tracking-tight">Recent Experiences</h2>
            {data.experiences.length > 0 ? <div className="space-y-4">
                {data.experiences.map(exp => <div key={exp.id} className="p-5 border rounded-xl bg-card space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground">{exp.type} • {exp.year}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${exp.verificationStatus === "verified" ? "bg-primary text-primary-foreground hover:bg-primary/80" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                        {exp.verificationStatus}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{exp.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span>{exp.rounds} rounds</span>
                      <span>Difficulty: {exp.difficulty}</span>
                      <span>{exp.helpfulCount} found helpful</span>
                    </div>
                  </div>)}
              </div> : <p className="text-muted-foreground italic">No experiences yet.</p>}
          </section>
        </div>

        <div className="space-y-8">
          {/* Roles */}
          <section className="space-y-4">
            <h3 className="font-editorial text-xl">Roles</h3>
            {data.roles && data.roles.length > 0 ? <ul className="space-y-2">
                {data.roles.map(r => <li key={r.id} className="text-sm py-2 border-b last:border-0">{r.title}</li>)}
              </ul> : <div className="text-sm text-muted-foreground">
                {data.company.roles && data.company.roles.length > 0 ? <ul className="space-y-2">
                    {data.company.roles.map((r, i) => <li key={i} className="text-sm py-2 border-b last:border-0">{r}</li>)}
                  </ul> : <p className="italic">No specific roles listed.</p>}
              </div>}
          </section>

          {/* Alumni */}
          <section className="space-y-4">
            <h3 className="font-editorial text-xl">Alumni Network</h3>
            {data.alumni.length > 0 ? <div className="space-y-4">
                {data.alumni.map(alumnus => <div key={alumnus.id} className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${alumnus.avatarBg?.includes('bg-') ? alumnus.avatarBg : 'bg-muted text-muted-foreground'}`}>
                      {alumnus.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alumnus.name}</p>
                      <p className="text-xs text-muted-foreground">{alumnus.role}</p>
                    </div>
                  </div>)}
              </div> : <p className="text-muted-foreground text-sm italic">No alumni profiles yet.</p>}
          </section>
        </div>
      </div>
    </div>;
}