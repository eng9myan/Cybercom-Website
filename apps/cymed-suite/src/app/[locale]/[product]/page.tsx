import { notFound } from "next/navigation";
import { getProduct } from "@/config/products";
import { HospitalDashboard } from "@/features/hospital/dashboard";
import { ClinicDashboard } from "@/features/clinic/dashboard";
import { PharmacyDashboard } from "@/features/pharmacy/dashboard";
import { LaboratoryDashboard } from "@/features/laboratory/dashboard";
import { ImagingDashboard } from "@/features/imaging/dashboard";
import { CyshopDashboard } from "@/features/cyshop/dashboard";
import { ErpDashboard } from "@/features/erp/dashboard";

const DASHBOARDS: Record<string, React.FC> = {
  hospital: HospitalDashboard,
  clinic: ClinicDashboard,
  pharmacy: PharmacyDashboard,
  laboratory: LaboratoryDashboard,
  imaging: ImagingDashboard,
  cyshop: CyshopDashboard,
  erp: ErpDashboard,
};

export default async function ProductDashboardPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const Dashboard = DASHBOARDS[slug];
  if (!Dashboard) notFound();
  return <Dashboard />;
}
