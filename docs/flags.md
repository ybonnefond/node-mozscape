# Flags

## url-metrics endpoint cols bitflags

More details on this flags in the [moz documentation](https://moz.com/help/guides/moz-api/mozscape/api-reference/url-metrics)

|Flag|Bitflag|
|-|-|
|title|1|
|canonical_url|4|
|subdomain|8|
|root_domain|16|
|external_equity_links|32|
|subdomain_external_links|64|
|root_domain_external_links|128|
|equity_links|256|
|subdomains_linking|512|
|root_domains_linking|1024|
|links|2048|
|subdomain_subs_linking|4096|
|root_domain_domains_linking|8192|
|moz_rank_url|16384|
|moz_rank_subdomain|32768|
|moz_rank_root_domain|65536|
|moz_trust|131072|
|moz_trust_subdomain|262144|
|moz_trust_root_domain|524288|
|moz_rank_external_equity|1048576|
|moz_rank_subdomain_external_equity|2097152|
|moz_rank_root_domain_external_equity|4194304|
|moz_rank_subdomain_domain_combined|8388608|
|moz_rank_root_domain_combined|16777216|
|subdomain_spam_score|67108864|
|social|134217728|
|http_status_code|536870912|
|links_to_subdomain|4294967296|
|links_to_root_domain|8589934592|
|root_domains_linking_to_subdomain|17179869184|
|page_authority|34359738368|
|domain_authority|68719476736|
|external_links|549755813888|
|external_links_to_subdomain|140737488355328|
|external_links_to_root_domain|2251799813685248|
|linking_c_blocks|36028797018963968|
|time_last_crawled|144115188075855872

## anchor-text endpoint
|Flag|Bitflag|
|-|-|
|term|2|
|internal_pages_linking|8|
|internal_subdomains_linking|16|
|external_pages_linking|32|
|external_subdomains_linking|64|
|external_root_domains_linking|128|
|internal_moz_rank_passed|256|
|external_moz_rank_passed|512|
|image_link|1024


## links endpoint
|Flag|Bitflag|
|-|-|
|null|0|
|flags|2 |
|anchor_text|4 |
|normalized_anchor_text|8 |
|mox_rank_passed|16

## linkcols
|Flag|Bitflag|
|-|-|
|no_follow|1|
|same_subdomain|2|
|meta_refresh|4|
|same_ip_address|8|
|same_c_block|16|
|spam_score|32|
|301_redirect|64|
|302_redirect|128|
|no_script|256|
|off_screen|512|
|meta_no_follow|2048|
|same_root_domain|4096|
|img|8192|
|feed_auto_discovery|16384|
|rel_canonical|32768|
|via_301|65536
