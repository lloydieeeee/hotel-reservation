import AdminSignInForm from "./AdminSignInForm";

function AdminSignInPage() {
  return (
    <section className="flex justify-center items-center">
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-center mb-4 text-2xl font-bold leading-9 tracking-tight">
          Admin Panel
        </h2>

        <AdminSignInForm />
      </div>
    </section>
  );
}

export default AdminSignInPage;
