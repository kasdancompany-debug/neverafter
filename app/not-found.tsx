import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 sm:py-32">
      <p className="label">404</p>
      <h1 className="h-display mt-3 max-w-2xl">This page can&apos;t be found.</h1>
      <p className="lede mt-5 max-w-xl">The link may be out of date, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/start-here" className="btn-primary">Start here</Link>
        <Link href="/articles" className="btn-secondary">Browse articles</Link>
      </div>
    </section>
  );
}
