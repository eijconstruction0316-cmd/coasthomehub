type JsonLdProps = {
  data: unknown;
};

function safeJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}
