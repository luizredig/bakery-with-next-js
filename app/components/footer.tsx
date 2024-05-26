import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <Card className="flex min-h-12 w-full flex-row items-center justify-center rounded-none border-b-0 border-l-0 border-r-0">
      <p className="text-sm">
        © Copyright <span className="font-semibold">redig</span>
      </p>
    </Card>
  );
};

export default Footer;
