/**
 * created by MS 01.03.2019
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Form, Checkbox } from "semantic-ui-react";
import { Test, Profile } from "./app";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface ProfileProps {
  profile: Profile;
  onUpdate: (profile: Profile) => any;
}

function withProps<Props, State>(Component: any, props: Props) {
  return function(matchProps: Props) {
    return <Component {...props} {...matchProps} />;
  };
}

class ProfileComponent extends React.Component<ProfileProps, {}> {
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
          <Link to="/">
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
}

class Apphandler extends React.Component<{}, ApplicationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeProfile: { firstName: "", lastName: "", grade: 1, topic: "" }
    };
  }

  updateProfile = (newProfile: Profile) => {
    this.setState({ activeProfile: newProfile });
  };

  public render() {
    return (
      <Router>
        <div>
          <Button>No Content</Button>
          <Link to="/">
            <Button>No Content</Button>
          </Link>
          <Link to="/link">
            <Button>Content</Button>
          </Link>
          <Route
            path="/link"
            component={withProps(ProfileComponent, {
              profile: this.state.activeProfile,
              onUpdate: this.updateProfile
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
