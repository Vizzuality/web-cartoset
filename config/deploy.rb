require "bundler/capistrano"

set :application, "cartoset"
set :repository, "git@github.com:Vizzuality/cartoset.git"

set :user,  'ubuntu'
ssh_options[:forward_agent] = true
default_run_options[:pty] = true

set :scm, :git
set :git_shallow_clone, 1
set :branch, "production"

set :deploy_to, "/home/ubuntu/www/#{application}"

role :web, "178.79.142.149"
role :app, "178.79.142.149"

# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end