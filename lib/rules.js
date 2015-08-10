module.exports = exports = {
  parameters: {
    AccessID: 'string',
    Signature: 'string',
    Expires: 'int'
  },
  api: {
    'url-metrics': {
      parameters: {
        Cols: 'bitflags'
      },
      flags: {
        'title'                         : 1,
        'url'                           : 4,
        'subdomain'                     : 8,
        'root_domain'                   : 16,
        'external_links'                : 32,
        'subdomain_external_links'      : 64,
        'domain_external_links'         : 128,
        'juice_passing_links'           : 256,
        'subdomains_linking'            : 512,
        'domains_linking'               : 1024,
        'links'                         : 2048,
        'subdomain_subs_linking'        : 4096,
        'domain_domains_linking'        : 8192,
        'mozRank'                       : 16384,
        'subdomain_mozRank'             : 32768,
        'domain_mozRank'                : 65536,
        'mozTrust'                      : 131072,
        'subdomain_mozTrust'            : 262144,
        'domain_mozTrust'               : 524288,
        'external_mozRank'              : 1048576,
        'subdomain_external_juice'      : 2097152,
        'domain_external_juice'         : 4194304,
        'subdomain_domain_juice'        : 8388608,
        'domain_domain_juice'           : 16777216,
        'canonical_url'                 : 268435456,
        'http_status'                   : 536870912,
        'subdomain_links'               : 4294967296,
        'domain_links'                  : 8589934592,
        'domains_linking_to_subdomain'  : 17179869184,
        'page_authority'                : 34359738368,
        'domain_authority'              : 68719476736
      }
    },


    'anchor-text': {
      parameters: {
        Scope: ['phrase_to_page', 'phrase_to_subdomain', 'phrase_to_domain', 'term_to_page', 'term_to_subdomain', 'term_to_domain'],
        Filter: ['internal', 'external'],
        Limit: 'int',
        Offset: 'int',
        Cols: 'bitflags'
      },
      flags: {
        'phrase'                        : 2,
        'internal_pages_linking'        : 8,
        'internal_subdomains_linking'   : 16,
        'external_pages_linking'        : 32,
        'external_subdomains_linking'   : 64,
        'external_root_domains_linking' : 128,
        'internal_mozRank_passed'       : 256,
        'external_mozRank_passed'       : 512,
        'image_link'                    : 1024
      }
    },


    'links': {
      parameters: {
        Scope: ['page_to_page', 'page_to_subdomain', 'page_to_domain', 'subdomain_to_page', 'subdomain_to_subdomain', 'subdomain_to_domain', 'domain_to_page', 'domain_to_subdomain', 'domain_to_domain'],
        Sort: ['page_authority', 'domain_authority', 'domains_linking_domain', 'domains_linking_page', 'by_spam_score'],
        Filter: ['internal', 'external', 'follow', 'nofollow', 'nonequity', 'equity', 'relcanonical', '301', '302'],
        SourceDomain: 'string',
        TargetCols: 'bitflags',
        SourceCols: 'bitflags',
        LinkCols: 'bitflags',
        Limit: 'int',
        Offset: 'int'
      },
      flags: {
        'null'                          : 0,
        'flags'                         : 2 ,
        'anchor_text'                   : 4 ,
        'normalized_anchor_text'        : 8 ,
        'moxRank_passed'                : 16
      }
    },

    'top-pages': {
      parameters: {
        Sort: ['page_authority', 'domains_linking_page'],
        Filter: ['all', 'status200', 'status301', 'status302', 'status4xx', 'status5xx'],
        Limit: 'int',
        Offset: 'int'
      }
    }
  }
}
