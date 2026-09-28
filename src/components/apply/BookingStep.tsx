import IClosedBooking from "./IClosedBooking";

type Props = {
  fullName: string;
  email: string;
  phone: string;
};

export default function BookingStep({ fullName, email, phone }: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <IClosedBooking email={email} fullName={fullName} phone={phone} />
    </div>
  );
}
