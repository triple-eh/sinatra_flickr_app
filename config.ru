require ::File.expand_path('./server.rb',  __FILE__)
set :app_file, __FILE__
run Sinatra::Application