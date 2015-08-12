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
      }
    },

    'anchor-text': {
      parameters: {
        Scope: ['phrase_to_page', 'phrase_to_subdomain', 'phrase_to_domain', 'term_to_page', 'term_to_subdomain', 'term_to_domain'],
        Filter: ['internal', 'external'],
        Limit: 'int',
        Offset: 'int',
        Cols: 'bitflags'
      }
    },


    'links': {
      parameters: {
        Scope: ['page_to_page', 'page_to_subdomain', 'page_to_domain', 'subdomain_to_page', 'subdomain_to_subdomain', 'subdomain_to_domain', 'domain_to_page', 'domain_to_subdomain', 'domain_to_domain'],
        Sort: ['page_authority', 'domain_authority', 'domains_linking_domain', 'domains_linking_page', 'by_spam_score'],
        Filter: { type: 'array', enum: ['internal', 'external', 'follow', 'nofollow', 'nonequity', 'equity', 'relcanonical', '301', '302'] },
        SourceDomain: 'string',
        TargetCols: 'bitflags',
        SourceCols: 'bitflags',
        LinkCols: 'bitflags',
        Limit: 'int',
        Offset: 'int'
      }
    },

    'top-pages': {
      parameters: {
        Sort: ['page_authority', 'domains_linking_page'],
        Filter: ['all', 'status200', 'status301', 'status302', 'status4xx', 'status5xx'],
        Limit: 'int',
        Offset: 'int'
      }
    },

    'metadata': {
      parameters: {}
    }
  }
}
