import React,{Component} from "react";

export class ErrorBoundary extends Component{
   constructor(props){
    super(props)

    this.state={
        error:null
    }
   } 
   componentDidCatch(error,errorInfo){
    console.log(error,errorInfo);
   } 

   static getDervivedStateFromError(error){
    return { error}
   }

   render(){
    if(this.state.error)
    return <div className="text-red-800">Something Went Wrong!!</div>

    return this.props.children;
   }

}