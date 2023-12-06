require 'net/http'
require 'uri'

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  def plausible_script_js
    uri = URI.parse("https://plausible.io/js/script.js")
    response = Net::HTTP.get_response uri
    render html: response.body
  end

  def plausible_api_event
    incoming = request.raw_post
    parsed = JSON.parse(incoming)

    uri = URI('https://plausible.io/api/event')
    headers = { 'Content-Type': 'application/json' }
    response = Net::HTTP.post(uri, parsed.to_json, headers)
    p response

    render html: "ok"
  end
end
