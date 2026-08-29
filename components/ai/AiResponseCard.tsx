"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, Map, Lightbulb, type LucideIcon } from "lucide-react";
import { parseAskResponse, extractKeepLearningTopics } from "@/lib/parseAskResponse";

export interface AiResponseCardProps {
  content: string;
  label: string;
  labelIcon: LucideIcon;
  sectionIcons?: Record<string, LucideIcon>;
  showQuickLinks?: boolean;
}

export default function AiResponseCard({
  content,
  label,
  labelIcon: LabelIcon,
  sectionIcons = {},
  showQuickLinks = true,
}: AiResponseCardProps) {
  const sections = parseAskResponse(content);

  return (
    <motion.div
      className="card space-y-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-600">
        <LabelIcon size={14} /> {label}
      </div>
      {sections.map((section, i) => {
        const key = section.heading.toLowerCase();
        const Icon = sectionIcons[key] ?? Lightbulb;

        if (key === "keep learning") {
          const topics = extractKeepLearningTopics(section.body);
          return (
            <div key={i}>
              <SectionHeading icon={Icon} heading={section.heading} />
              <div className="mt-2 flex flex-wrap gap-2">
                {topics.length > 0
                  ? topics.map((t) => (
                      <Link key={t.slug} href={`/learn/${t.slug}`} className="pill hover:bg-sage-200">
                        {t.label}
                      </Link>
                    ))
                  : <p className="text-sm text-charcoal-500">{section.body}</p>}
              </div>
            </div>
          );
        }

        return (
          <div key={i}>
            <SectionHeading icon={Icon} heading={section.heading} />
            <p className="mt-1 whitespace-pre-line text-sm text-charcoal-700">{section.body}</p>
          </div>
        );
      })}

      {showQuickLinks && (
        <div className="flex flex-wrap gap-2 border-t border-forest-100 pt-3">
          <Link href="/simulate" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:underline">
            <Calculator size={15} /> Open Simulator
          </Link>
          <Link href="/scenarios" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:underline">
            <Map size={15} /> Explore a Scenario
          </Link>
        </div>
      )}
    </motion.div>
  );
}

function SectionHeading({ icon: Icon, heading }: { icon: LucideIcon; heading: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-900">
      <Icon size={15} className="text-forest-600" />
      {heading}
    </div>
  );
}
