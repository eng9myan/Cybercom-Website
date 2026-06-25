export { CyberComApiClient, apiClient } from "./client.js";
export type { ApiClientConfig, ApiResponse, ApiError } from "./client.js";

export { productsApi } from "./products.js";
export type { Product, ProductCategory, ProductListParams, Edition } from "./products.js";

export { industriesApi } from "./industries.js";
export type { Industry } from "./industries.js";

export { demoApi } from "./demo.js";
export type { DemoRequestPayload, DemoRequestResponse } from "./demo.js";

export { contactApi } from "./contact.js";
export type { ContactPayload, ContactResponse, NewsletterPayload, NewsletterResponse, Department } from "./contact.js";

export { partnersApi } from "./partners.js";
export type { Partner, PartnerType, PartnerApplicationPayload, PartnerApplicationResponse } from "./partners.js";

export { docsApi } from "./docs.js";
export type { DocSection, DocItem, DocSearchResult, DocContentType } from "./docs.js";
