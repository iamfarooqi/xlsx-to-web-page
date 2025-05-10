import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload CSV or Excel</h1>
      <FileUpload />
    </main>
  );
}
