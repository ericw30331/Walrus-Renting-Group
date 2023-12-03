import React,{useState,useRef} from 'react';
import "./Page3.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EventIcon from '@mui/icons-material/Event';
import Progress2 from '../../Images/ProgressBars/Progress2.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormData } from '../../Context/formdatacontext';
const Page3 = ({onNext,onPrevious}) =>{
    const datePickerRef = useRef();
    const {formData,dispatch} = useFormData();
    const [startDate,setStartDate] = useState(formData.formData.startDate);
    const [error,setError] = useState('');
    const [dateColor,setDateColor] = useState('#c2c2c2');
    const [leaseColor,setLeaseColor] = useState('#c2c2c2');
    const [rentColor,setRentColor] = useState('#c2c2c2');
    const [depColor,setDepColor] = useState('#c2c2c2');
    const handleTextInput = (inputName,value)=>{
        setLeaseColor('#c2c2c2');
        setRentColor('#c2c2c2');
        setDepColor('#c2c2c2');
        setError('');
        dispatch({type:'UPDATE_DATA',payload:{[inputName]:value}});
    }
    const handleDateChange=(date)=>{
        if(date && date <new Date()){
            setDateColor('red');
            setError('Select a Date after the current date')
        }
        else{
            setStartDate(date);
            setDateColor('#c2c2c2');
            dispatch({type:'UPDATE_DATA',payload:{startDate:date}});
            datePickerRef.current.setOpen(false);
            setError('');
        }
    };

    const openDatePicker=()=>{
        if(datePickerRef.current){
            datePickerRef.current.setOpen(true);
        }
    };
    const CustomInput =React.forwardRef(({onClick},ref)=>(
        <input onClick={onClick}
        value=""
        readOnly
        ref={ref}
        style={{cursor:'pointer'}}
        />
    ));
    const handleLeaseInput =(e)=>{
        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','Backspace','Delete','ArrowLeft','ArrowRight','Home','End'];
        if(!allowedKeys.includes(e.key)){
            setLeaseColor('red');
            e.preventDefault();
            setError('Lease Length must be a number in terms of months');
        }
    }
    const handleRentInput =(e)=>{
        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','$','.','Backspace','Delete','ArrowLeft','ArrowRight','Home','End'];
        if(!allowedKeys.includes(e.key)){
            setRentColor('red');
            e.preventDefault();
            setError('Monthly Rent must be in the format $1000.00');
        }
    }
    const handleDepInput =(e)=>{
        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','$','.','Backspace','Delete','ArrowLeft','ArrowRight','Home','End'];
        if(!allowedKeys.includes(e.key)){
            setDepColor('red');
            e.preventDefault();
            setError('Security Deposit must be in the format $1000.00');
        }
    }
    return(
        <div class="create-a-property-vkS" id="165:13951">
        <div class="rectangle-13-2Hg" id="I165:13951;165:8687"></div>
        <div class="line-8-kUa" id="I165:13951;165:8688"></div>
        <p class="create-a-property-HUW" id="I165:13951;165:8689">Create a Property</p>
        <div class="frame-15-PXY" id="I165:13951;165:8690">
        <p class="progress-bar-WcA" id="I165:13951;165:8691">Progress Bar</p>
        <p class="complete-2qQ" id="I165:13951;165:8692">70% Complete</p>
        </div>
        <img class="group-17-Y34" src={Progress2} alt={Progress2} id="I165:13951;165:8693"/>
        <div class="frame-19-Tvi" id="I165:13951;165:8698">
        <p class="availability-zQr" id="I165:13951;165:8699">Availability</p>
        <p class="now-or-never-7Ea" id="I165:13951;165:8700">Now or Never</p>
        </div>
        <div class="frame-19-cSE" id="I165:13951;165:8753">
        <p class="cost-7dt" id="I165:13951;165:8754">Cost</p>
        <p class="approximate-2F4" id="I165:13951;165:8755">Approximate</p>
        </div>
        <div onClick={onNext} class="submit-jQN" id="I165:13951;165:8704">Next Page</div>
        <div class="error">
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
        <ArrowBackIosIcon onClick={onPrevious} class="group-49-ndY" src="/api/prod-us-east-2-first-cluster/projects/LZTNXrW..." id="I165:13951;165:8706"/>
        <div style={{borderColor: dateColor}}onClick={openDatePicker}  class="search-bar-uiA" id="I165:13951;165:8729">
        <div class="frame-17-bqt" id="I165:13951;165:8731">
        <p class="earlest-start-date-Ym8" id="I165:13951;165:8732">Earlest Start Date</p>
        {startDate &&(
        <p class="dd-mm-yyyy-FfY" id="I165:13951;165:8733">{startDate.toLocaleDateString()}</p>
        )}
        </div>

        <EventIcon class="vector-k6W" src="/api/prod-us-east-2-first-cluster/projects/LZTNXrW..." id="I165:13951;165:8745"/>
                <DatePicker selected={startDate} onChange={handleDateChange} dateFormat="MMMM d,yyyy" isClearable showYearDropdown
                customInput ={<CustomInput/>}
                ref={datePickerRef}/>

        </div>
        <div style={{borderColor: leaseColor}}class="search-bar-ehg" id="I165:13951;165:8746">
        <p class="lease-label">Lease Length</p>
        <p class="lease-label">(in months)</p>
        <input  class="lease-input" onKeyDown={handleLeaseInput}  name="leaseLength" value={formData.formData.leaseLength} onChange={(e)=>handleTextInput(e.target.name,e.target.value)}/>
        </div>
        <div style={{borderColor: rentColor}}class="price-J9x" id="I165:13951;165:8756">
        <p class="rent-label">Monthly Rent</p>
        <input class="rent-input" onKeyDown={handleRentInput}type="text" placeholder="$0.00" name="monthlyRent" value={formData.formData.monthlyRent} onChange={(e)=>handleTextInput(e.target.name,e.target.value)}/>
        </div>
        <div style={{borderColor: depColor}}class="price-uJA" id="I165:13951;165:8761">
        <p class="dep-label">Security Deposit</p>
        <input class="dep-input" onKeyDown={handleDepInput} type="text" placeholder="$0.00" name="securityDep" value={formData.formData.securityDep} onChange={(e)=>handleTextInput(e.target.name,e.target.value)}/>
        </div>
        </div>
    );
};
export default Page3;