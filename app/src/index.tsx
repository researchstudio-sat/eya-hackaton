/**
 * created by MS 01.03.2019
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Button,
  Form,
  Checkbox,
  Grid,
  Container,
  Image,
  Header,
  Segment,
  Menu,
  Icon,
  List
} from "semantic-ui-react";
import { Test, Profile, Method, generateTestMethods } from "./app";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { uptime } from "os";
import { string } from "prop-types";

interface ProfileProps {
  profile: Profile;
  onUpdate: (profile: Profile) => any;
}

interface MethodProps {
  method: Method;
  onUpdate: (activeMethod: Method) => any;
}

interface MenuProps {
  activeItem: string;
  onUpdate: (activeItem: string) => any;
}

interface ClassProps {
  activeClass: string;
  onUpdate: (activeClass: string) => any;
}

function withProps<Props, State>(Component: any, props: Props) {
  return function(matchProps: Props) {
    return <Component {...props} {...matchProps} />;
  };
}

class ScheduleComponent extends React.Component<ProfileProps, {}> {
  constructor(props: ProfileProps) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Header as="h1">Schedule</Header>
        <div>
          <Segment attached="top">Schedule</Segment>
        </div>
      </div>
    );
  }
}

class CoachComponent extends React.Component<ProfileProps, {}> {
  constructor(props: ProfileProps) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Header as="h1">Coach</Header>
        <div>
          <Segment attached="top">Coach</Segment>
        </div>
      </div>
    );
  }
}

class ProfileComponent extends React.Component<ProfileProps, {}> {
  constructor(props: ProfileProps) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Header as="h1">Profile</Header>
        <div>
          <Segment attached="top">Profile</Segment>
        </div>
      </div>
    );
  }
}

class ClassComponent extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Header as="h1">{this.props.activeClass}</Header>
        <div>
          <Segment attached="top">
            <Link to="/addmethod">
              <Button type="submit">Add Method</Button>
            </Link>
          </Segment>
        </div>
      </div>
    );
  }
}

class MethodListComponent extends React.Component<MethodProps, {}> {
  constructor(props: MethodProps) {
    super(props);
  }

  handleChange(e: any) {
    console.log("ActiveMethod", e);
    this.props.onUpdate(e);
  }

  public render() {
    return (
      <List.Item>
        <Image avatar src="icons/-fff-11.png" />
        <List.Content>
          <List.Header as={this.props.method.methodId}>
            {this.props.method.title}
          </List.Header>
          <List.Description>{this.props.method.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

class AddMethodComponent extends React.Component<ProfileProps, {}> {
  methods = Array<Method>();
  activeMethod: Method;
  constructor(props: ProfileProps) {
    super(props);
    this.methods = generateTestMethods(30);
    this.activeMethod = this.methods[0];
  }

  updateMethod(method: Method) {
    this.activeMethod = method;
  }
  public render() {
    return (
      <div>
        <Header as="h1">Add Method</Header>
        <div>
          <Segment attached="top">
            <Grid>
              <Grid.Column width={4}>
                <List divided verticalAlign="middle">
                  <MethodListComponent
                    method={this.methods[0]}
                    onUpdate={this.updateMethod}
                  />
                </List>
              </Grid.Column>
              <Grid.Column width={9}>
                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              </Grid.Column>
              
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}

class DashboardComponent extends React.Component<ClassProps, {}> {
  constructor(props: ClassProps) {
    super(props);
  }

  handleChange(e: any) {
    console.log("ActiveClass", e);
    this.props.onUpdate(e);
  }

  public render() {
    return (
      <div>
        <Header as="h1">Dashboard</Header>
        <div>
          <Segment attached="top">
            <Grid columns={3} divided celled>
              <Grid.Row textAlign="center">
                <Grid.Column
                  onClick={() => {
                    this.handleChange("2a");
                  }}
                >
                  <Link to="/class">
                    <h1>2a</h1>
                  </Link>
                </Grid.Column>
                <Grid.Column
                  onClick={() => {
                    this.handleChange("4c");
                  }}
                >
                  <Link to="/class">
                    <h1>4c</h1>
                  </Link>
                </Grid.Column>
                <Grid.Column
                  onClick={() => {
                    this.handleChange("6a");
                  }}
                >
                  <Link to="/class">
                    <h1>6a</h1>
                  </Link>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row textAlign="center">
                <Grid.Column
                  onClick={() => {
                    this.handleChange("7b");
                  }}
                >
                  <Link to="/class">
                    <h1>7b</h1>
                  </Link>
                </Grid.Column>
                <Grid.Column
                  onClick={() => {
                    this.handleChange("8b");
                  }}
                >
                  <Link to="/class">
                    <h1>8b</h1>
                  </Link>
                </Grid.Column>
                <Grid.Column
                  onClick={() => {
                    this.handleChange("10d");
                  }}
                >
                  <Link to="/class">
                    <h1>10d</h1>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}

class FooterComponent extends React.Component<MenuProps, {}> {
  constructor(props: MenuProps) {
    super(props);
  }

  handleChange(e: any) {
    console.log("ActiveItem: ", e);
    this.props.onUpdate(e);
  }

  public render() {
    return (
      <div>
        <Menu attached="bottom" tabular>
          <Menu.Item name="1" active={this.props.activeItem === "1"}>
            <Link
              to="/dashboard"
              onClick={() => {
                this.handleChange("1");
              }}
            >
              CLASSES
            </Link>
          </Menu.Item>
          <Menu.Item name="2" active={this.props.activeItem === "2"}>
            <Link
              to="/schedule"
              onClick={() => {
                this.handleChange("2");
              }}
            >
              SCHEDULE
            </Link>
          </Menu.Item>
          <Menu.Item name="3" active={this.props.activeItem === "3"}>
            <Link
              to="/coach"
              onClick={() => {
                this.handleChange("3");
              }}
            >
              COACH
            </Link>
          </Menu.Item>
          <Menu.Item name="4" active={this.props.activeItem === "4"}>
            <Link
              to="/profile"
              onClick={() => {
                this.handleChange("4");
              }}
            >
              PROFILE
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

class LoginComponent extends React.Component<ProfileProps, {}> {
  constructor(props: ProfileProps) {
    super(props);
  }

  private onClick = () => {
    this.props.onUpdate({
      firstName: "",
      lastName: "",
      grade: 0,
      topic: ""
    });
  };

  public render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>First Name</label>

            <input
              value={this.props.profile.firstName}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              value={this.props.profile.lastName}
              placeholder="Last Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Grade</label>
            <input value={this.props.profile.grade} placeholder="Grade" />
          </Form.Field>
          <Form.Field>
            <label>Topic</label>
            <input value={this.props.profile.topic} placeholder="Topic" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Link to="/dashboard">
            <Button onClick={this.onClick} type="submit">
              Login
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

class ProfileComponentOld extends React.Component<ProfileProps, {}> {
  constructor(props: ProfileProps) {
    super(props);
  }

  private onClick = () => {
    this.props.onUpdate({
      firstName: "",
      lastName: "Meyers",
      grade: 0,
      topic: ""
    });
  };

  public render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>First Name</label>

            <input
              value={this.props.profile.firstName}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              value={this.props.profile.lastName}
              placeholder="Last Name"
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Link to="/dashboard">
            <Button type="submit">Submit</Button>
          </Link>
        </Form>
        <Button onClick={this.onClick}>Update my profile randomly</Button>
      </div>
    );
  }
}

interface ApplicationState {
  activeProfile: Profile;
  activeClass: string;
  activeItem: string;
}

class Apphandler extends React.Component<{}, ApplicationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeProfile: { firstName: "", lastName: "", grade: 1, topic: "" },
      activeClass: "7b",
      activeItem: "1"
    };
  }

  updateProfile = (newProfile: Profile) => {
    this.setState({ activeProfile: newProfile });
  };

  updateActiveClass = (newClass: string) => {
    this.setState({ activeClass: newClass });
  };

  updateActiveItem = (newItem: string) => {
    this.setState({ activeItem: newItem });
  };

  // Main screen
  public render() {
    return (
      <Router>

        <div>
          <Route
            path="/login"
            component={withProps(LoginComponent, {
              profile: this.state.activeProfile,
              onUpdate: this.updateProfile
            })}
          />
          <Route
            path="/dashboard"
            component={withProps(DashboardComponent, {
              profile: this.state.activeProfile,
              onUpdate: this.updateActiveClass
            })}
          />
          <Route
            path="/schedule"
            component={withProps(ScheduleComponent, {
              profile: this.state.activeProfile,
              onUpdate: this.updateProfile
            })}
          />
          <Route
            path="/coach"
            component={withProps(CoachComponent, {
              profile: this.state.activeProfile,
              onUpdate: this.updateProfile
            })}
          />
          <Route
            path="/profile"
            component={withProps(ProfileComponent, {
              profile: this.state.activeProfile,
              onUpdate: this.updateProfile
            })}
          />
          <Route
            path="/class/"
            component={withProps(ClassComponent, {
              activeClass: this.state.activeClass,
              onUpdate: this.updateActiveClass
            })}
          />
          <Route
            path="/addmethod/"
            component={withProps(AddMethodComponent, {
              class: this.state.activeClass
            })}
          />
          <Route
            path="/"
            component={withProps(FooterComponent, {
              activeItem: this.state.activeItem,
              onUpdate: this.updateActiveItem
            })}
          />
        </div>
      </Router>
    );
  }
}

const main = document.getElementById("main");
if (main) {
  ReactDOM.render(<Apphandler />, main);
}
