// See https://developers.cloudflare.com/workers/examples/redirect/
export default {
  async fetch(request) {
    const PERMANENT_REDIRECT = 301;

    const url = new URL(request.url);
    const { pathname } = url;

    let destination = "https://www.ironforge.cloud/";

    const REDIRECTS = {
      "/course/account-data-matching":
        "https://solana.com/developers/courses/program-security/account-data-matching",
      "/course/anchor-cpi":
        "https://solana.com/developers/courses/onchain-development/anchor-cpi",
      "/course/anchor-pdas":
        "https://solana.com/developers/courses/onchain-development/anchor-pdas",
      "/course/arbitrary-cpi":
        "https://solana.com/developers/courses/program-security/arbitrary-cpi",
      "/course/bump-seed-canonicalization":
        "https://solana.com/developers/courses/program-security/bump-seed-canonicalization",
      "/course/close-mint":
        "https://solana.com/developers/courses/token-extensions/close-mint",
      "/course/closing-accounts":
        "https://solana.com/developers/courses/program-security/closing-accounts",
      "/course/compressed-nfts":
        "https://solana.com/developers/courses/state-compression/compressed-nfts",
      "/course/default-account-state":
        "https://solana.com/developers/courses/token-extensions/default-account-state",
      "/course/deserialize-instruction-data":
        "https://solana.com/developers/courses/native-onchain-development/deserialize-instruction-data",
      "/course/duplicate-mutable-accounts":
        "https://solana.com/developers/courses/program-security/duplicate-mutable-accounts",
      "/course/serialize-instruction-data":
        "https://solana.com/developers/courses/native-onchain-development/serialize-instruction-data-frontend",
      "/course/deserialize-custom-data":
        "https://solana.com/developers/courses/native-onchain-development/deserialize-custom-data-frontend",
      "/course/pda":
        "https://solana.com/developers/courses/native-onchain-development/program-derived-addresses",
      "/course/intro-to-custom-on-chain-programs":
        "https://solana.com/developers/courses/intro-to-solana/intro-to-custom-onchain-programs",
      "/course/paging-ordering-filtering-data":
        "https://solana.com/developers/courses/native-onchain-development/paging-ordering-filtering-data-frontend",
      "/course/solana-mobile-dApps-with-expo":
        "https://solana.com/developers/courses/mobile/solana-mobile-dapps-with-expo",
      "/course/cpi":
        "https://solana.com/developers/courses/native-onchain-development/cross-program-invocations",
      "/course/env-variables":
        "https://solana.com/developers/courses/program-optimization/program-configuration",
      "/course/versioned-transaction":
        "https://solana.com/developers/courses/program-optimization/lookup-tables",
      "/course/vrf":
        "https://solana.com/developers/courses/connecting-to-offchain-data/verifiable-randomness-functions",
      "/course/token-extensions-on-chain":
        "https://solana.com/developers/courses/token-extensions/token-extensions-onchain",
      "/course/generalized-state-compression":
        "https://solana.com/developers/courses/state-compression/generalized-state-compression",
      "/course/getting-started":
        "https://solana.com/developers/courses/intro-to-solana/getting-started",
      "/course/hello-world-program":
        "https://solana.com/developers/courses/native-onchain-development/hello-world-program",
      "/course/interact-with-wallets":
        "https://solana.com/developers/courses/intro-to-solana/interact-with-wallets",
      "/course/intro-to-anchor-frontend":
        "https://solana.com/developers/courses/onchain-development/intro-to-anchor-frontend",
      "/course/intro-to-anchor":
        "https://solana.com/developers/courses/onchain-development/intro-to-anchor",
      "/course/intro-to-cryptography":
        "https://solana.com/developers/courses/intro-to-solana/intro-to-cryptography",
      "/course/intro-to-onchain":
        "https://solana.com/developers/courses/onchain-development/intro-to-onchain",
      "/course/intro-to-reading-data":
        "https://solana.com/developers/courses/intro-to-solana/intro-to-reading-data",
      "/course/intro-to-solana-mobile":
        "https://solana.com/developers/courses/mobile/intro-to-solana-mobile",
      "/course/intro-to-token-extensions-program":
        "https://solana.com/developers/courses/token-extensions/intro-to-token-extensions-program",
      "/course/intro-to-writing-data":
        "https://solana.com/developers/courses/intro-to-solana/intro-to-writing-data",
      "/course/local-setup":
        "https://solana.com/developers/courses/onchain-development/local-setup",
      "/course/mwa-deep-dive":
        "https://solana.com/developers/courses/mobile/mwa-deep-dive",
      "/course/nfts-with-metaplex":
        "https://solana.com/developers/courses/tokens-and-nfts/nfts-with-metaplex",
      "/course/non-transferable-token":
        "https://solana.com/developers/courses/token-extensions/non-transferable-token",
      "/course/oracles":
        "https://solana.com/developers/courses/connecting-to-offchain-data/oracles",
      "/course/owner-checks":
        "https://solana.com/developers/courses/program-security/owner-checks",
      "/course/pda-sharing":
        "https://solana.com/developers/courses/program-security/pda-sharing",
      "/course/program-architecture":
        "https://solana.com/developers/courses/program-optimization/program-architecture",
      "/course/program-security":
        "https://solana.com/developers/courses/native-onchain-development/program-security",
      "/course/program-state-management":
        "https://solana.com/developers/courses/native-onchain-development/program-state-management",
      "/course/reinitialization-attacks":
        "https://solana.com/developers/courses/program-security/reinitialization-attacks",
      "/course/rust-macros":
        "https://solana.com/developers/courses/program-optimization/rust-macros",
      "/course/security-intro":
        "https://solana.com/developers/courses/program-security/security-intro",
      "/course/signer-auth":
        "https://solana.com/developers/courses/program-security/signer-auth",
      "/course/solana-pay":
        "https://solana.com/developers/courses/solana-pay/solana-pay",
      "/course/token-extensions-in-the-client":
        "https://solana.com/developers/courses/token-extensions/token-extensions-in-the-client",
      "/course/token-extensions-metadata":
        "https://solana.com/developers/courses/token-extensions/token-extensions-metadata",
      "/course/token-program":
        "https://solana.com/developers/courses/tokens-and-nfts/token-program",
      "/course/transfer-fee":
        "https://solana.com/developers/courses/token-extensions/transfer-fee",
      "/course/type-cosplay":
        "https://solana.com/developers/courses/program-security/type-cosplay",
      "/course/durable-nonces":
        "https://solana.com/developers/courses/offline-transactions",
    };

    if (pathname.startsWith("/course")) {
      // Redirect any course to /courses, in case a specific redirect isn't found
      destination = "https://solana.com/developers/courses";
      if (REDIRECTS[pathname]) {
        destination = REDIRECTS[pathname];
      }
    }

    console.log(`Redirecting ${pathname} to ${destination}`);

    return Response.redirect(destination, PERMANENT_REDIRECT);
  },
};
