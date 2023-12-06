// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import Plausible from 'plausible-tracker'

const { trackPageview } = Plausible({
    domain: 'railstesting.com',
    trackLocalhost: true
});

trackPageview()
