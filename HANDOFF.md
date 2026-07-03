# HANDOFF — for Claude on the Mac mini (from the laptop session, July 3 2026)

Peter is mid-task: pointing resprousa.com at the new site. Pick up EXACTLY here.

## Context
- New Respro site (COVID removed, ServPro-style corporate, operators page, SEO)
  is LIVE at https://prguzzi-cmyk.github.io/resprousa-com/ — this repo.
- Forms: DONE. FormSubmit activated → prguzzi@gmail.com (test verified success:true).
- Domain: resprousa.com registered at GoDaddy, but NAMESERVERS are HostGator
  (ns8219/ns8220.hostgator.com) → DNS is edited at HOSTGATOR, not GoDaddy.
- EMAIL WARNING: MX is Microsoft 365 (resprousa-com.mail.protection.outlook.com),
  SPF TXT "v=spf1 include:spf.protection.outlook.com -all", TXT MS=ms68995299.
  DO NOT touch MX/TXT. Full backup in dns-backup.txt in this repo.

## The remaining task (Peter was 1 click from cPanel in HostGator)
1. HostGator → cPanel → Zone Editor → resprousa.com → Manage.
2. Change A record @ (currently 192.185.41.238) → 185.199.108.153
   and ADD A records: 185.199.109.153, 185.199.110.153, 185.199.111.153.
3. Change www (currently CNAME/A to the same host) → CNAME prguzzi-cmyk.github.io
4. LEAVE MX + TXT + autodiscover alone.
5. Then (from any machine, gh CLI is authed on the laptop as prguzzi-cmyk):
   - Add CNAME file "resprousa.com" to this repo root, push.
   - gh api repos/prguzzi-cmyk/resprousa-com/pages -X PUT -f cname=resprousa.com
   - Wait for DNS + cert, enforce HTTPS:
     gh api repos/prguzzi-cmyk/resprousa-com/pages -X PUT -F https_enforced=true
   - Update canonicals/og:url/sitemap.xml/robots.txt from
     prguzzi-cmyk.github.io/resprousa-com/ → https://resprousa.com/ and push.
6. Note: GitHub Pages legacy builder for this repo is FLAKY — builds error/hang;
   retrigger: gh api repos/prguzzi-cmyk/resprousa-com/pages/builds -X POST
7. Peter communication style: one small step at a time, plain words, no jargon,
   he struggles with trackpad/copy-paste — open pages for him, read Safari tabs
   (AppleScript) instead of asking him where he is.

## Also outstanding (lower priority)
- Counsel review of "partners not franchises" wording (see README).
- Birchwood app (~/birchwood-wedding-app on laptop, repo birchwood-wedding-app):
  separate project, all committed & pushed.
