import React, { PureComponent, Fragment } from "react";
import {
    Col,
    Button,
    ButtonToolbar,
    Container,
    Row,
    FormGroup,
    CustomInput,
    Label,
    Input,
    Form,
} from "reactstrap";
import { translate } from "react-i18next";
import {
    callApi,
    validationHelper,
    userHelper,
    errorHelper,
} from "../../../helpers";
import SelectUser from "./SelectUser";
import { connect } from "react-redux";
import ListRoleSelect from "./ListRoleSelect";

class AddEditUserForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: "1",
            user: null,
            currRole: null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.updateUser)
            return {
                type: "2",
            };
    }

    handleChangeTypeUserTeacher = e => {
        this.setState({ type: e.target.value });
    };

    handleChangeUser = value => {
        this.setState({
            user: value,
        });
    };

    setSelectedRole = role => {
        this.setState({ currRole: role });
    };

    handleAddEditTeacher = () => {
        let idForm = "add-edit-user";
        // Validate form
        validationHelper.validateForm(idForm);
        let formValues = validationHelper.getFormData(idForm);
        if (formValues) {
            const {
                toggle,
                getListUser,
                currDept,
                currSchool,
                currUser,
                updateUser,
            } = this.props;
            const { type, user, currRole } = this.state;
            let formData = {};
            formData["department_id"] = currDept["id"];
            formData["school_id"] = currSchool["id"];
            formData["type"] = type;
            if (currRole) formData["role_for_school_id"] = currRole.id;

            if (type === "1") {
                if (!user) return alert("Vui lòng chọn tài khoản");
                formData["user_id"] = user.id;
            } else {
                delete formValues["customRadio"];
                for (const key in formValues) {
                    formData[key] = formValues[key];
                }
                formData["password"] = userHelper.hasPasswordSHA("123456789");
                formData["active"] = 1;
            }
            let p = null;
            if (!updateUser)
                p = callApi("for_school/users", "POST", null, formData);
            else {
                // Add user_id to edit
                formData["user_id"] = currUser.user.id;
                p = callApi("for_school/users", "PUT", null, formData);
            }

            if (p) {
                p.then(res => {
                    getListUser();
                    toggle();
                }).catch(error => {
                    let processError = errorHelper.commonProcessError.bind(
                        this
                    );
                    processError(error, "DEPARTMENT_STAFF");
                });
            }
        }
    };

    render() {
        const { toggle, currUser, updateUser } = this.props;
        const { user, type } = this.state;

        return (
            <Container>
                <Row>
                    <Col md={12} lg={12} xl={12}>
                        <Form id="add-edit-user">
                            {!updateUser ? (
                                <FormGroup>
                                    <Label>Hình thức tài khoản</Label>
                                    <div
                                        onChange={
                                            this.handleChangeTypeUserTeacher
                                        }
                                    >
                                        <CustomInput
                                            type="radio"
                                            id="typeRadio1"
                                            value="1"
                                            defaultChecked
                                            name="customRadio"
                                            label="Đã có tài khoản Lingo"
                                        />
                                        <CustomInput
                                            type="radio"
                                            id="typeRadio2"
                                            value="2"
                                            name="customRadio"
                                            label="Chưa có tài khoản Lingo"
                                        />
                                    </div>
                                </FormGroup>
                            ) : null}

                            {type === "1" ? (
                                <Fragment>
                                    <h4 className="mb-3">
                                        Chọn tài khoản đã có từ hệ thống Lingo
                                    </h4>
                                    <FormGroup>
                                        <Label>Chọn tài khoản *</Label>
                                        <SelectUser
                                            currUser={user}
                                            handleChangeUser={
                                                this.handleChangeUser
                                            }
                                        />
                                    </FormGroup>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <h4 className="mb-3">
                                        Nhập thông tin nhân viên
                                    </h4>
                                    <FormGroup>
                                        <Label for="username">
                                            Tài khoản *
                                        </Label>
                                        <Input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Tài khoản"
                                            defaultValue={
                                                currUser
                                                    ? currUser.user.username
                                                    : ""
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fullname">
                                            Họ và tên *
                                        </Label>
                                        <Input
                                            type="text"
                                            name="fullname"
                                            id="fullname"
                                            placeholder="Họ và tên"
                                            defaultValue={
                                                currUser
                                                    ? currUser.user.fullname
                                                    : ""
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">
                                            Số điện thoại *
                                        </Label>
                                        <Input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Số điện thoại"
                                            defaultValue={
                                                currUser
                                                    ? currUser.user.phone
                                                    : ""
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email *</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            defaultValue={
                                                currUser
                                                    ? currUser.user.email
                                                    : ""
                                            }
                                        />
                                    </FormGroup>
                                </Fragment>
                            )}

                            <FormGroup>
                                <Label for="fullname">Quyền truy cập</Label>
                                <ListRoleSelect
                                    setSelectedRole={this.setSelectedRole}
                                    selectedRole={this.state.currRole}
                                />
                            </FormGroup>

                            <ButtonToolbar className="form__button-toolbar">
                                <Button
                                    color="primary"
                                    type="button"
                                    onClick={this.handleAddEditTeacher}
                                >
                                    {updateUser ? "Cập nhật" : "Thêm mới"}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        toggle();
                                    }}
                                >
                                    Hủy
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const tAddEditTeacherForm = translate("common")(AddEditUserForm);
const mapStateToProp = state => {
    const { forSchoolReducer } = state;
    return {
        currSchool: forSchoolReducer.currSchool,
        currDept: forSchoolReducer.currDept,
    };
};

export default connect(mapStateToProp)(tAddEditTeacherForm);