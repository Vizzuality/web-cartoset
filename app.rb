require "rubygems"
require "bundler/setup"

Bundler.require(:default)

get '/' do
  File.read(File.join('public/views', 'index.html'))
end