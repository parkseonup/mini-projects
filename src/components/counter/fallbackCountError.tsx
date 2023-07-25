export default function FallbackCountError({ error }: { error: Error }) {
  console.log('[error:]', error.message);

  return <strong>에러가 발생했습니다.</strong>;
}
