import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router"

import Line from "public/shared/Line";
import PlayerList from "public/shared/PlayerList";
import { HideMethod, ShowMethod } from "public/util/popup";
import { messagesSuccess } from "public/util/messages";

import { useDispatch } from "react-redux"
import { usePlayerParticipantHook } from "public/redux/hooks"

import { db } from "src/firebase"
import { ref, onValue, query, orderByChild, equalTo, get } from "firebase/database"
import { RewardList } from "public/shared";

function UserCountdownCheckin() {

    // router
    const router = useRouter()
    // dispatch
    const dispatch = useDispatch()
    const eventID = router.query.eventId

    // user
    const user = usePlayerParticipantHook()
    useEffect(() => {
        if (user.participantId === null || user.participantId === undefined) {
            router.push("/event/join")
        }
        else {
            if (user.eventId !== eventID) {
                router.push("/")
            }
        }
    }, [])

    // state
    const [minutes, setMinutes] = useState(0)  // store minutes of countdown
    const [seconds, setSeconds] = useState(0) // store seconds of countdown
    const [rewards, setRewards] = useState([]) // store rewards of event
    const [event, setEvent] = useState({})
    const [player, setPlayer] = useState(0)  // number of player
    const [playerList, setPlayerList] = useState([])  // list of plater
    const isActive = true  // countdown
    const [isStop, setIsStop] = useState(false)  // countdown
    const [title, setTitle] = useState("")
    const [countdown, setCountdown] = useState()
    const [deadline, setDeadline] = useState()
    const [maxTicket, setMaxTicket] = useState()
    const [eventId, setEventId] = useState("")
    const [status, setStatus] = useState()

    // get event
    const getEvent = query(ref(db, "event"), orderByChild("eventId"), equalTo(eventID))
    useEffect(() => {
        onValue(getEvent, (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                setEvent(Object.values(data)[0])
                setStatus(Object.values(data)[0].status) // get status to route to lucky spin if status of event equal to 3
            }
        })
    }, [])

    useEffect(() => {
        setTitle(event.title)
        setCountdown(event.waitingTime)
        setDeadline(event.startAt)
        setMaxTicket(event.maxTicket)
        setEventId(event.eventId)
    }, [event])

    // get reward from firebase
    const getReward = query(ref(db, "event_rewards"), orderByChild("eventId"), equalTo(eventID))

    useEffect(() => {
        onValue(getReward, (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                setRewards(Object.values(data))
            }
        })
    }, [])

    // get realtime number of player

    const getNumberPlayer = query(ref(db, "event"), orderByChild("evenId"), equalTo(eventID))

    useEffect(() => {
        onValue(getNumberPlayer, (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
                const rawData = Object.values(data)
                setPlayer(rawData[0].userJoined)
            }
        })
    }, [])

    // get realtime participants from firebase
    const que2 = query(ref(db, "event_participants"), orderByChild("eventId"), equalTo(eventID));
    useEffect(() => {
        onValue(que2, (snapshot) => {
            if (snapshot.exists()) {
                const rawData = snapshot.val();
                setPlayerList(Object.values(rawData));
                const data = Object.values(rawData)
                setPlayer(data.length)
            }
        });
    }, [])

    //countdown
    useEffect(() => {
        let deadlineCountdown = deadline + ((countdown) * 1000)
        let countdownTimer = null

        if (isActive && isStop === false) {
            countdownTimer = setInterval(() => {
                let nowDate = new Date()
                let left = deadlineCountdown - nowDate
                let nowSeconds = Math.floor((left / 1000) % 60);
                let nowMinutes = Math.floor((left / 1000 / 60) % 60);
                if (nowMinutes <= 0 && nowSeconds <= 0) {
                    clearInterval(countdownTimer)
                    setIsStop(true)
                }
                else {
                    setMinutes(nowMinutes)
                    setSeconds(nowSeconds)
                }
            }, 1000)
        }
        else {
            clearInterval(countdownTimer)
        }
        return () => clearInterval(countdownTimer)
    }, [isActive, isStop, dispatch, countdown, deadline])

    // route to lucky spin if status of event equal to 3
    useEffect(() => {
        if (status === 3) {
            ShowMethod(dispatch, messagesSuccess.I0010, true)
            setTimeout(() => {
                router.push(`/event/luckyspin/${eventId}`)
            }, 2000)
        }
    }, [status, dispatch, eventId])

    // Set online
    useEffect(() => {
        const setOnlineStatus = (status) => {
            if (!user.participantId) return;
            get(query(ref(db, "event_participants/" + user.participantId + "/status"))).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("!!!");
                    update(ref(db, 'event_participants/' + user.participantId), {
                        status: status
                    });
                    if (status === 2) clearInterval(onlineStatus);
                }
            })
        }

        setOnlineStatus(1);
        const onlineStatus = setInterval(() => setOnlineStatus(1), 1000);
        window.addEventListener('beforeunload', () => setOnlineStatus(2));

        return () => {
            setOnlineStatus(2);
            clearInterval(onlineStatus);
            window.removeEventListener('beforeunload', () => setOnlineStatus(2));
        }
    }, [])

    const BG_COLOR = "bg-gradient-to-tr from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]";

    const countDownNumber = { background: "#3B88C3" }

    // render component
    const renderTitle = useMemo(() => {
        return (
            <div className="flex flex-col">
                <h1 className={`font-[900] uppercase text-[#004599] text-[36px] text-center`}>{title}</h1>
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>bắt đầu sau ...</h1>
            </div>
        )
    }, [title])

    const renderCountdownTime = useMemo(() => {
        return (
            <div className="flex justify-center items-center max-w-xl w-4/5 mb-3">

                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {minutes > 9 ? (Math.floor(minutes / 10)) : 0}
                </div>
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {minutes > 9 ? (Math.floor(minutes % 10)) : minutes}
                </div>
                <div className="mr-1 text-6xl flex justify-center items-center">
                    <span className="flex justify-center items-center text-[#3B88C3]">:</span>
                </div>
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {seconds > 9 ? Math.floor(seconds / 10) : 0}
                </div>
                <div className="w-[65px] h-[80px] rounded-[10px] mr-1 text-white text-6xl flex justify-center items-center drop-shadow-lg" style={countDownNumber}>
                    {seconds > 9 ? Math.floor(seconds % 10) : seconds}
                </div>

            </div>)
    }, [minutes, seconds])

    const renderTitle2 = useMemo(() => {
        return (
            <div className="flex">
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>thông tin giải thưởng</h1>
            </div>
        )
    }, [])

    const renderLine = useMemo(() => {
        return (
            <div className="max-w-xl w-4/5 mb-2 z-0"> <Line /> </div>
        )
    }, [])

    const renderRewards = useMemo(() => {
        return (
            <section className="flex flex-col overflow-x-hidden overflow-y-auto scrollbar-hide justify-center items-center w-4/5 max-w-xl h-[300px] my-2">
                <div className="my-2 w-full h-full flex flex-col max-h-[300px]">
                    <RewardList listReward={rewards} />
                </div>
            </section>
        )
    }, [rewards])

    const renderTitle3 = useMemo(() => {
        return (
            <div className="flex flex-col">
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>danh sách người chơi</h1>
                <h1 className={`font-[900] uppercase text-[#004599] text-[18px] text-center mb-2`}>{`số người tham gia: ${player}/${maxTicket}`}</h1>
            </div>
        )
    }, [player, maxTicket])

    const renderPlayerList = useMemo(() => {
        return (
            <div className="max-w-xl w-4/5 h-[200px] overflow-x-hidden overflow-y-auto scrollbar-hide py-3">
                <div className="w-full h-full flex flex-col items-center">
                    <PlayerList listPlayer={playerList} />
                </div>
            </div>
        )
    }, [playerList])

    return (
        <section className={`h-screen w-screen flex flex-col items-center justify-center ${BG_COLOR}`}>
            {renderTitle}
            {renderCountdownTime}
            {renderTitle2}
            {renderLine}
            {renderRewards}
            {renderTitle3}
            {renderPlayerList}
        </section>
    )
}

export default UserCountdownCheckin