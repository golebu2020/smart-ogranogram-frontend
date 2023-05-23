
import * as React from 'react'
import {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import CardContent from './components/CardContent';
import { nanoid } from 'nanoid';
import axios from 'axios';





function MinusSquare(props) {
  return (
    <SvgIcon className='icon-design' fontSize="inherit" style={{ width: 20, height: 20 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon className='icon-design' fontSize="inherit" style={{ width: 20, height: 20 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon

      className="close"
      fontSize="inherit"
      style={{ width: 20, height: 20 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    marginBottom: 12,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function handleClick(id){
  console.log(`Click has been handled: ${id}`)
}

export default function Home() {
  const [organogram, setOrganogram] = useState([]);

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/organogram/')
        .then(response => {
          setOrganogram(response.data[0]);
          console.log(response.data[0].seniorManagers)
        })
        .catch(error => {
          console.log(error);
        });
  }, []);
  return (
    <div className="tree-view-container" >
        <TreeView aria-label="customized" defaultExpanded={['1']} defaultCollapseIcon={<MinusSquare />} defaultExpandIcon={<PlusSquare />} defaultEndIcon={<CloseSquare />} sx={{ height: 600, flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}>
        
        <StyledTreeItem className="parent-card-style" nodeId={nanoid()} 
        label=<CardContent title={"Director"} name={organogram.firstName + " " + organogram.lastName} empNum={organogram.employmentNo}/>
        >
            {organogram.seniorManagers ? organogram.seniorManagers.map((directorItem)=>
                <StyledTreeItem className="card-style" key={directorItem.id} nodeId={nanoid()} onClick={(e)=> handleClick(directorItem.id)}
                label=<CardContent position={directorItem.id} title={"Senior Manager"} name={directorItem.firstName + " " + directorItem.lastName} empNum={directorItem.employmentNo}/>
                >
                    {directorItem.managers ? directorItem.managers.map((managerItem)=>
                        <StyledTreeItem className="card-style" key={managerItem.id} nodeId={nanoid()}
                        label=<CardContent position={managerItem.id} title={"Manager"} name={managerItem.firstName + " " + managerItem.lastName} empNum={managerItem.employmentNo}/>
                        >
                            {managerItem.seniorDevelopers ? managerItem.seniorDevelopers.map((seniorDeveloperItem)=>
                                <StyledTreeItem className="card-style" key={seniorDeveloperItem.id} nodeId={nanoid()}
                                label=<CardContent position={seniorDeveloperItem.id} title={"Senior Developer"} name={seniorDeveloperItem.firstName + " " + seniorDeveloperItem.lastName} empNum={seniorDeveloperItem.employmentNo}/>
                                >
                                    {seniorDeveloperItem.juniorDevelopers ? seniorDeveloperItem.juniorDevelopers.map((juniorDeveloperItem)=>
                                        <StyledTreeItem className="card-style" key={juniorDeveloperItem.id} nodeId={nanoid()}
                                        label=<CardContent position={juniorDeveloperItem.id} title={"Junior Developer"} name={juniorDeveloperItem.firstName + " " + juniorDeveloperItem.lastName} empNum={(juniorDeveloperItem.employmentNo === "" ? <p>This employee has been removed</p> : juniorDeveloperItem.employmentNo)}/>
                                        />
                                    ): <p></p>}
                            </StyledTreeItem>
                            ): <p></p>}
                        </StyledTreeItem>
                    ): <p></p>}
                </StyledTreeItem>
            ): <p></p>}
        </StyledTreeItem>
        </TreeView>
    </div>
 
  );
}