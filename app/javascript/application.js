// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import Plausible from 'plausible-tracker'

const { trackPageview } = Plausible({
    // TODO: Proxy through development BASE_URL
    // Find out if this can be dynamic...
    apiHost: 'http://localhost:3000',
    domain: 'railstesting.com',
    trackLocalhost: true
});

trackPageview()
