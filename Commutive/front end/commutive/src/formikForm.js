import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";

const form_id = "form_id";
class MaintenanceForm extends Component {
  editOnClick = event => {
    event.preventDefault();
    const data = !this?.props?.status?.edit;
    this.props.setStatus({
      edit: data
    });
  };

  cancelOnClick = event => {
    event.preventDefault();
    //this.props.resetForm();
    this.props.setStatus({
      edit: false
    });
  };

  _renderAction() {
    return (
      <>
        <div className="form-statusbar">
          {this?.props?.status?.edit ? (
            <>
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                /*form={form_id}*/
                onClick ={() => {this.props.submitChanges();
                  this.props.setStatus({
                  edit: false
                });}}
              >
                Save
                
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.cancelOnClick}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary btn-sm"
              onClick={this.editOnClick}
            >
              Edit
            </button>
          )}
        </div>
      </>
    );
  }

  _renderFormView = () => {
    return (
      <>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-11">
            <label type="text" name="name" className="form-control">
              {this?.props?.name}
            </label>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-11">
            <textarea type="text" name="brand_name" className="form-control input-disabled" disabled value={this?.props?.description}/>
          </div>
        </div>
      
      </>
    );
  };

  _renderFormInput = () => {
    return (
      <>
       
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-11">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder={this.props.name || this.props.oldName}
              //value={this.props.name}
              onBlur={(e)=>this.props.setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-11">

            <textarea 
              type="text"
              name="description"
              className="form-control"
              placeholder={this.props.description || "description"}
              onBlur={(e)=>this.props.setDescription(e.target.value)}
            />
          </div>
        </div>
    
        
      </>
    );
  };

  render() {
    return (
      <>
        {/* <h2>Edit Community</h2> */}
        
        <form id={form_id} style={{width: "90%"}}>
          {this?.props?.status?.edit
            ? this._renderFormInput()
            : this._renderFormView()}
           
        </form>
        {this._renderAction()}
        {/* <h4>Current value</h4> */}
        {/* <div>
          <pre>
            <code>{JSON.stringify(this.props.fields, null, 2)}</code>
       
          </pre>
        </div> */}
      </>
    );
  }
}




// const FormikForm = withFormik({
//   mapPropsToStatus: props => {
//     return {
//       edit: props?.edit || false
//     };
//   },
//   // mapPropsToValues: props => {
//   //   return {
//   //     name: props.field.name,
//   //     description: props.field.description,

//   //   };
//   // },
  
//   enableReinitialize: true,
//   handleSubmit: (values, { props, ...actions }) => {
//     //props.updateFields(values);
//     //console.log(values);
//     //props.setName(values.name);
//     //props.setDescription(values.description);
//     actions.setStatus({
//       edit: false
//     });
//     console.log("i am here")
//     // {console.log("llllllll")}
//     //props.submitChanges();
//   }
  
// })


// (MaintenanceForm);


export default MaintenanceForm;