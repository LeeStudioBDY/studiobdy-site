# Pointing studiobdy.com at GitHub Pages — the Hover steps

The domain and its email stay at Hover. Only two things change: the record for the bare domain (`@`) and the record for `www`. **Do not touch the MX record or the TXT record that starts `v=spf1`** — those are your email.

## 1. Open the DNS editor

1. Go to https://www.hover.com and sign in.
2. Click **Domains** in the top bar, then click **studiobdy.com**.
3. Click the **DNS** tab. You will see a list of records. Today it has:
   - `A` · `@` · `216.40.34.41` (Hover's parking page)
   - `A` · `www` · `216.40.34.41`
   - `MX` · `@` · `10 mx.hover.com.cust.hostedemail.com` ← email, leave alone
   - `TXT` · `@` · `v=spf1 include:_spf.hostedemail.com ~all` ← email, leave alone

## 2. Remove the two parking records

Hover will not let an `A` record and a `CNAME` share a name, and the parking IP must go, so:

1. On the row `A · @ · 216.40.34.41`, click the row's menu (⋯ or the pencil) and choose **Delete**. Confirm.
2. On the row `A · www · 216.40.34.41`, do the same.

## 3. Add the records for GitHub Pages

Click **Add a record** and add each of these, one at a time. The fields are **Type**, **Hostname** and **Target** (Hover may call it Value or IP address). Leave TTL at the default.

| Type | Hostname | Target |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | leestudiobdy.github.io |

Copy-paste values:

```
185.199.108.153
```
```
185.199.109.153
```
```
185.199.110.153
```
```
185.199.111.153
```
```
leestudiobdy.github.io
```

Four `A` records with the same hostname `@` is correct — GitHub uses all four.

Optional, for IPv6 (harmless to skip): four `AAAA` records with hostname `@` and targets `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

## 4. Check the list

It should now read, in some order:

- `A` · `@` · four rows, 185.199.108.153 to 185.199.111.153
- `CNAME` · `www` · `leestudiobdy.github.io`
- `MX` · `@` · `10 mx.hover.com.cust.hostedemail.com` (unchanged)
- `TXT` · `@` · `v=spf1 include:_spf.hostedemail.com ~all` (unchanged)

Then tell Claude it is done. Hover's changes usually show up within a few minutes, sometimes up to an hour. Once GitHub sees the records it issues the HTTPS certificate, and the last step is to tick **Enforce HTTPS** in the repository's Pages settings, which Claude will do.

## 5. Optional: prove the domain is yours to GitHub

This stops anyone else's GitHub Pages site from ever claiming studiobdy.com if the repository were deleted. It is a one-off:

1. In GitHub, go to https://github.com/settings/pages, click **Add a domain**, enter `studiobdy.com`, click **Add domain**.
2. GitHub shows a TXT record: a hostname like `_github-pages-challenge-leestudiobdy` and a value (a string of letters and numbers).
3. In Hover's DNS tab, **Add a record**: Type `TXT`, Hostname exactly as GitHub shows it (without `.studiobdy.com`), Target the value GitHub shows.
4. Back in GitHub, click **Verify**. It can take a few minutes for the record to be seen.

## Checking from a terminal

```bash
dig +short A studiobdy.com
```
should print the four 185.199.x.153 addresses, and

```bash
dig +short MX studiobdy.com
```
should still print `10 mx.hover.com.cust.hostedemail.com.`
