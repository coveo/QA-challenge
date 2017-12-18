const SCREENSHOT_PATH = "./screenshots";
const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
  "src_folders": [
    "/test"// Where you are storing your Nightwatch e2e tests
  ],
  "output_folder": "./reports", 
  "custom_commands_path": ["./test/commands"],
  "custom_assertions_path": ["./test/assertions"],
  "page_objects_path": ["./test/pages"],
  "globals_path": "",
  "selenium": {
    "start_process": true,
    "start_session": true,
    "server_path": BINPATH + "selenium.jar",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver": BINPATH + "chromedriver"
    }
  },
  "detailed_output": true,
  "test_workers": { "enabled": false, "workers": "1" }, // perform tests in parallel where possible
  "test_settings": {
    "default": {
      "launch_url": "http://localhost",
      "selenium_port": 80,
      "selenium_host": "localhost",
      "silent": true,
      "skip_testcases_on_fail": true,
      "screenshots": {
        "enabled": true,
        "on_failure": true,
        "on_error": false,
        "path": SCREENSHOT_PATH
      },

      "globals": {
        "waitForConditionTimeout": 10000    // wait for content on the page before continuing
      }
    },
    "local": {
      "launch_url": "http://localhost",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "skip_testcases_on_fail": true,
      "screenshots": {
        "enabled": true,
        "on_failure": true,
        "on_error": false,
        "path": SCREENSHOT_PATH
      },
      "globals": {
        "waitForConditionTimeout": 15000 // on localhost sometimes internet is slow so wait...
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '62.0',
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome": {
      "selenium_port": 80,
      "selenium_host": "hub.browserstack.com", // put as "hub.browserstack.com" if run on BrowserStack and  put as "localhost" if run on local
      "silent": true,
      "skip_testcases_on_fail": true,
      "screenshots": {
        "enabled": true,
        "on_failure": true,
        "on_error": false,
        "path": SCREENSHOT_PATH
      },
      "desiredCapabilities": {
        "browserName": "Chrome",
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '62.0',
        'browserstack.user': "",
        'browserstack.key': "",
        "browserstack.debug": true,
        "javascriptEnabled": true,
        "acceptSslCerts": true
      },
    },
   
  }
}


/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function (error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

