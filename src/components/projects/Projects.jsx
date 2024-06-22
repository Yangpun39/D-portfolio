import React,{useEffect,useState} from "react";
import {FaDonate} from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal,ModalHeader,ModalBody, Row, Button} from 'reactstrap'
import { Modal, ModalHeader, ModalBody, Button, Row } from 'reactstrap';
//import projectImg from '../../assets/'
import "./Projects.css"

const Projects=({state})=>{
    const [modal,setModal]=useState(false)
    const [projects,setProjects]=useState("");
    useEffect(()=>{
        const {contract}=state;
        const projectDetails= async()=>{
            const projects= await contract.methods.allProjects().call()
            setProjects(projects)
        }
        contract && projectDetails()
    },[state])
    const donateEth= async(event)=>{
        event.preventDefault();
        try{
            const {contract,web3}=state
        const eth=document.querySelector("#eth").value
        const weiValue=web3.utils.toWei(eth,"ether")
        const accounts= await web3.eth.getAccounts();
        await contract.methods.donate().send({from:accounts[0],value:weiValue,gas:480000})
        alert("Tramsaction Successful")
        }catch(err){
        alert("Transaction Not Successful")
        }
        
    }
    return(
        <section className="project-section">
            <h1 className="title">Projects</h1>
            <div className="card-wrapper">
                {projects!=="" && projects.map((project)=>{
                    if(project.githubLink && project.image){
                    const githublink=`https://github.com/Yangpun39/${project.githubLink}`
                    return (
                        <a href={githublink} className="project-card" target="_blank" rel="noopener noreferrer">
                        <div className="card-img">
                            <img src={`https://gateway.pinata.cloud/ipfs/${project.image}`}/></div>
                        <div className="card-text">
                        <h3>{project.name}</h3>
                        </div>
                    </a>

                    )
                    }
                })}
            </div>

            {/* ====================popup bootstrap====================== */}
            <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                        <ModalHeader toggle={() => setModal(!modal)}>
                            Enter the ETH you want to donate!
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={donateEth}>
                                <Row>
                                    <input id="eth" type="text" />
                                        <Button className='mt-4' >
                                            Send
                                        </Button>
                                </Row>
                            </form>
                        </ModalBody>
                    </Modal>
                    {/*  =========popup bootstrap end==========  */}
                    <p className='donate' onClick={() => setModal(true)}>Liked the project's ? Consider donating Eth's <FaDonate className='icon' /></p>
        </section>
    )
}
export default Projects