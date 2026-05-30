import Image from "next/image";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <div>
      ERP System
    </div>
  );
}
