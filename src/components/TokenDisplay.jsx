export default function TokenDisplay({ number, size = 'lg' }) {
  const cls = size === 'lg' ? 'token-large token-glow' : 'card-value';
  return <div className={cls}>#{number}</div>;
}
