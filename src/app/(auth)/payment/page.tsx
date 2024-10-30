import AccessBtn from "@/components/AccessBtn";
import CheckoutBtn from "@/components/CheckoutBtn";
import H1 from "@/components/H1";

type PaymentPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const success = "success" in (await searchParams);
  const cancelled = "cancelled" in (await searchParams);

  return (
    <main className="flex flex-col items-center gap-8">
      <H1 className="text-3xl font-semibold">
        PetSoft access requires payment
      </H1>

      {!success && (
        <>
          {" "}
          <CheckoutBtn />
        </>
      )}

      {cancelled && (
        <p className="text-red-600">
          You have cancelled the payment. You can try again by clicking the
          button above.
        </p>
      )}
      {success && (
        <>
          <AccessBtn />
          <p className="text-green-700 text-lg">
            Payment successful! You now have lifetime access to PetSoft. 🎉
          </p>
        </>
      )}
    </main>
  );
}
