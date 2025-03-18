import "./global.css";
import TourGuide from "@/app/public/user-guide";


const metadata = {
  title: "Next.js Forms Example",
  description: "Example application with forms and Postgres.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>
          <TourGuide>
            {children}
          </TourGuide>
        </body>
      </html>
    
  );
}
