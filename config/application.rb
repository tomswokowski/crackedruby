require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile
Bundler.require(*Rails.groups)

module Crackedruby
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    # Autoload lib/ except for directories that shouldn't be reloaded/eager loaded.
    config.autoload_lib(ignore: %w[assets tasks])

    # Redirect www to apex domain (hardcoded for now)
    config.middleware.insert_before Rack::Runtime, Rack::Rewrite do
      r301 %r{.*}, 'https://crackedruby.com$&', if: Proc.new { |rack_env|
        rack_env['SERVER_NAME'].start_with?('www.')
      }
    end
  end
end
