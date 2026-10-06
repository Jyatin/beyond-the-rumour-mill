import { notFound } from "next/navigation";
import { getCompanyIntelligence } from "@/server/queries/companies";
import { getCompanyPlacementInformation } from "@/server/queries/placement";

export default async function CompanyPage({ params }) {
  const [data, placementDrives] = await Promise.all([
    getCompanyIntelligence(params.id),
    getCompanyPlacementInformation(params.id),
  ]);

  if (!data) return notFound();

  return (
    <div className="container max-w-5xl py-12 md:py-16">
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
            {placementDrives.length > 0 && (
              <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-brand">
                {placementDrives.length} Placement Drive{placementDrives.length !== 1 && "s"}
              </span>
            )}
          </div>
          <div className="pt-2">
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Real interview experiences, questions, placement drives, and insights shared by verified candidates.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Placement Drives */}
          <section className="space-y-6">
            <h2 className="font-editorial text-2xl tracking-tight">Placement Drives</h2>
            {placementDrives.length > 0 ? (
              <div className="space-y-8">
                {placementDrives.map((drive) => (
                  <div key={drive.id} className="p-6 border border-border rounded-xl bg-card space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 border-b pb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{drive.season || "Placement Drive"}</h3>
                        <p className="text-sm text-muted-foreground">{drive.date || "Date TBA"}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                        drive.status === "Open" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        drive.status === "Completed" ? "bg-secondary text-secondary-foreground" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {drive.status}
                      </span>
                    </div>

                    {drive.eligibleStudentInformation && (
                      <div>
                        <h4 className="text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Eligible Students</h4>
                        <p className="text-sm">{drive.eligibleStudentInformation}</p>
                      </div>
                    )}

                    {drive.roles && drive.roles.length > 0 ? (
                      <div className="space-y-4 pt-2">
                        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Roles in this Drive</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {drive.roles.map((dr) => (
                            <div key={dr.id} className="p-4 rounded-lg bg-muted/50 border space-y-4">
                              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                <h5 className="font-medium">{dr.title}</h5>
                                <div className="flex gap-2">
                                  {dr.employmentType && <span className="text-xs bg-background border px-2 py-1 rounded-md">{dr.employmentType}</span>}
                                  {dr.ctc && <span className="text-xs bg-background border px-2 py-1 rounded-md font-medium">{dr.ctc}</span>}
                                </div>
                              </div>
                              
                              {dr.location && <p className="text-sm text-muted-foreground -mt-3 mb-2">{dr.location}</p>}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
                                <div>
                                  <h6 className="text-xs font-semibold text-muted-foreground mb-2">ELIGIBILITY</h6>
                                  {dr.eligibility ? (
                                    <ul className="text-sm space-y-1 list-disc pl-4">
                                      {dr.eligibility.cgpa && <li>CGPA: {dr.eligibility.cgpa}</li>}
                                      {dr.eligibility.branches && dr.eligibility.branches.length > 0 && <li>Branches: {dr.eligibility.branches.join(", ")}</li>}
                                      {dr.eligibility.backlog && <li>Backlogs: {dr.eligibility.backlog}</li>}
                                      {dr.eligibility.otherCriteria && <li>{dr.eligibility.otherCriteria}</li>}
                                    </ul>
                                  ) : (
                                    <p className="text-xs text-muted-foreground italic">No specific eligibility listed.</p>
                                  )}
                                </div>
                                <div>
                                  <h6 className="text-xs font-semibold text-muted-foreground mb-2">PREPARATION</h6>
                                  {dr.preparation ? (
                                    <div className="space-y-2 text-sm">
                                      {dr.preparation.requiredSkills && dr.preparation.requiredSkills.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {dr.preparation.requiredSkills.map(s => <span key={s} className="px-1.5 py-0.5 bg-background border rounded text-xs">{s}</span>)}
                                        </div>
                                      )}
                                      {dr.preparation.suggestedTopics && dr.preparation.suggestedTopics.length > 0 && (
                                        <p className="text-xs text-muted-foreground">Topics: {dr.preparation.suggestedTopics.join(", ")}</p>
                                      )}
                                    </div>
                                  ) : (
                                    <p className="text-xs text-muted-foreground italic">No preparation details listed.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No roles specified for this drive yet.</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No placement drives have been added yet.</p>
            )}
          </section>
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
    </div>
  );
}