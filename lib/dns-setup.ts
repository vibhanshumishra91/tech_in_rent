// This file MUST be imported before any MongoDB/Mongoose code
// It sets up Google DNS servers to fix SRV resolution issues
import dns from 'dns';

// Force Google DNS servers for all DNS lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('🔧 DNS servers configured:', dns.getServers());

export {}; // Make this a module
