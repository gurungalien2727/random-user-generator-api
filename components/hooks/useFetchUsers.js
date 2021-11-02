import React, {useState, useEffect} from 'react';

const useFetchUsers = (gender, nationality) =>{
    const [results,setResults] = useState([]);
    const [loading, setLoading]= useState(true);
    const [page, setPage]= useState(1);
    const [loadingMoreUsers, setLoadingMoreUsers] =useState(false);
    const [prevGender, setPrevGender] = useState(gender);
    const [prevNat, setPrevNat] = useState(nationality);

    useEffect(()=>{
        if(gender !== prevGender || nationality!==prevNat) setLoading(true);
        loadUsers();
      },[page, gender, nationality]);
  
      loadUsers=()=>{
        const URL=`https://randomuser.me/api/?page=${page}&results=10&gender=${gender}&nat=${nationality}`
        fetch(URL)
        .then(response => response.json())
        .then(jsonResponse =>{
          setLoading(false);
          setLoadingMoreUsers(false);
          if(gender === prevGender && nationality === prevNat  ){
             arr= (page==1) ?jsonResponse.results:[...results, ...jsonResponse.results];
           }
          
           else{
             arr= jsonResponse.results;
             if(gender!==prevGender)   setPrevGender(gender);
             if(nationality!==prevNat)  setPrevNat(nationality);
            
           }
  
          setResults(arr);
        }
          );
      }
  
      loadMoreUsers=()=>{
        setLoadingMoreUsers(true);
        setPage(page=>page+1);
      }

      return [loading, results, loadMoreUsers, loadingMoreUsers];

}

export default useFetchUsers;