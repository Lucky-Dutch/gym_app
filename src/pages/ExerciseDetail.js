import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { fetchData, exerciseOptions, youtubeOptions } from '../utils/fetchData'

import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'


const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([])
  const { id } = useParams()

    useEffect(() => {
      const fetchExercisesData = async () => {
        const exercisesDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

        const exerciseDetailData = await fetchData(`${exercisesDbUrl}/exercises/exercise/${id}`, exerciseOptions)
        setExerciseDetail(exerciseDetailData)

        const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name}`, youtubeOptions)
        setExerciseVideos(exerciseVideosData.contents)

      }
      fetchExercisesData();
    }, [id])
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises />
    </Box>
  )
}

export default ExerciseDetail