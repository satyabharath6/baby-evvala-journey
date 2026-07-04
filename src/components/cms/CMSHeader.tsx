import PageHeader from "../ui/PageHeader";

type Props = {
  title: string;
};

export default function CMSHeader({ title }: Props) {
  return (
    <header className="cms-header">
      <PageHeader title={title} subtitle="Manage Baby ఇవ్వల Journey" />
    </header>
  );
}