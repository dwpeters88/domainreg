import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  try {
    const domainQuery = url.searchParams.get("domain");
    
    if (!domainQuery) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Domain parameter is required",
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
    }

    // Basic validation for domain format
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?$/.test(domainQuery)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid domain format",
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
    }

    // Mock domain search results (replace with real API in production)
    const baseDomain = domainQuery.replace(/\.[^.]+$/, "");
    const extensions = [".com", ".co.za", ".net", ".org", ".io", ".africa"];
    
    const results = extensions.map((ext) => {
      const fullDomain = baseDomain + ext;
      
      // Use crypto.getRandomValues for Cloudflare Workers compatibility
      const randomArray = new Uint32Array(1);
      crypto.getRandomValues(randomArray);
      const isAvailable = (randomArray[0] / 0xFFFFFFFF) > 0.3;
      
      const prices = {
        ".com": 199,
        ".co.za": 59,
        ".net": 189,
        ".org": 179,
        ".io": 799,
        ".africa": 299,
      };

      return {
        domain: fullDomain,
        available: isAvailable,
        price: prices[ext] || 199,
        currency: "ZAR",
        tld: ext,
      };
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: results,
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      }
    );
  } catch (error) {
    console.error("Domain search error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      }
    );
  }
};
