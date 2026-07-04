import { notFound } from "next/navigation";
import { getModule, getProduct } from "@/config/products";
import { getModuleComponent } from "@/features/module-registry";
import { ModuleScaffold } from "@/components/modules/module-scaffold";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ product: string; module: string }>;
}) {
  const { product: productSlug, module: moduleSlug } = await params;
  const product = getProduct(productSlug);
  const module = getModule(productSlug, moduleSlug);
  if (!product || !module) notFound();

  const Component = getModuleComponent(productSlug, moduleSlug);
  if (Component) return <Component />;

  return <ModuleScaffold product={product} module={module} />;
}
