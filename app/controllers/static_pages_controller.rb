class StaticPagesController < ApplicationController
  def index
  end

  def goodbye
    @goodbye = "goodbye"
  end
end
