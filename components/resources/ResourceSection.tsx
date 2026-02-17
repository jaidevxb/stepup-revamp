import type { Section } from './resourcesData';
import ResourceCard from './ResourceCard';

export default function ResourceSection({ section }: { section: Section }) {
  return (
    <div>
      <div className="space-y-2">
        {section.resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
    </div>
  );
}
