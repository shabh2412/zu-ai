export default function Page({ params }: { params: { result_id: string } }) {
  return <div>Result {params.result_id}</div>;
}
