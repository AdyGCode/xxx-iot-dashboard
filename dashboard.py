from flask import Flask, render_template

MyDashboardApp = Flask(__name__)


@MyDashboardApp.route("/")  # http://localhost:5000/
def hello_world():
    return render_template('index.html',
                           page="home")


@MyDashboardApp.route("/clock")
def clock():
    return render_template('clock.html',
                           page='clock')


@MyDashboardApp.route("/about")
def about_app():
    return render_template('about.html',
                           page="about")


if __name__ == '__main__':
    MyDashboardApp.run()
