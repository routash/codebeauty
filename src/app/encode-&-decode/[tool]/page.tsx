"use client";

import React from "react";
import EncodeDecode from "@/components/sections/encode&decode";
import { useParams, notFound } from "next/navigation";

const validTools = [
  "base32-encode",
  "base32-decode",
  "base58-encode",
  "base58-decode",
  "base64-encode",
  "base64-decode",
  "url-encode",
  "url-decode",
  "json-url-encode",
  "json-url-decode",
  "html-encode",
  "html-decode",
  "xml-url-encode",
  "xml-url-decode",
  "utf8-converter",
  "utf8-decode",
  "hex-to-utf8",
  "json-decode-online",
  "json-encode-online",
];

export default function ToolPage() {
  const params = useParams();
  const tool = (params?.tool || "") as string;

  if (!validTools.includes(tool)) {
    notFound();
  }

  return <EncodeDecode defaultTool={tool} />;
}
