import { useState, useRef } from 'react';
import Button from '../../components/UI/Button';
import TextArea from '../../components/UI/TextArea';
import Back from '../../components/UI/Back';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import { useUser } from '../../context/userProvider';
import useHttp from '../../hooks/http-hook';

const AddPost = () => {
  const { user } = useUser();
  const { sendRequest } = useHttp();
  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const captionRef = useRef(null);

  const platforms = [
    { id: 1, img: "https://cdn.icon-icons.com/icons2/2429/PNG/512/facebook_logo_icon_147291.png", platform: "Facebook" },
    { id: 2, img: "https://cdn.icon-icons.com/icons2/1753/PNG/512/iconfinder-social-media-applications-3instagram-4102579_113804.png", platform: "Instagram" },
    { id: 3, img: "https://cdn.icon-icons.com/icons2/2037/PNG/512/media_social_tiktok_icon_124256.png", platform: "TikTok" }
  ];

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!captionRef.current.value.trim()) {
      showSnackbar("Insert your caption", "warning");
      return;
    }

    if (selectedPlatforms.length === 0) {
      showSnackbar("No platforms selected", "warning");
      return;
    }

    const formattedScheduleDate = scheduleDate ? scheduleDate.format('YYYY/MM/DD HH:mm:ss') : null;
    const base64Image = fileInputRef.current.files[0] ? await convertToBase64(fileInputRef.current.files[0]) : null;

    try {
      // const socMedResponse = await sendRequest({
      //   url: 'https://app.ayrshare.com/api/post',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer 4VZEBES-W4GMNAR-PDMWDRY-XWSSQB0`, // Replace with actual API key if different
      //   },
      //   body: JSON.stringify({

      //   })
      // });

      console.log(socMedResponse);
      showSnackbar("Post successfully scheduled!", "success");
    } catch (error) {
      console.error("Error posting to social media:", error);
      showSnackbar("Failed to schedule post", "error");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handlePlatformClick = (platformId) => {
    setSelectedPlatforms(prevSelected =>
      prevSelected.includes(platformId)
        ? prevSelected.filter(id => id !== platformId)
        : [...prevSelected, platformId]
    );
  };

  return (
    <main className="flex flex-col gap-5">
      <SnackbarComponent />
      <Back to="/profile" />
      <h1 className="text-lg font-bold">Create Post</h1>
      <section className="flex phone:flex-col desktop:flex-row w-full items-start gap-5">
        <div className="w-full">
          <TextArea ref={captionRef} title="Caption" />
          <h3 className="text-sm font-bold">Image (Optional)</h3>
          <div onClick={handleDivClick} className="bg-grey border-dashed border-2 border-gray-400 rounded-lg h-80 cursor-pointer flex justify-center items-center hover:bg-gray-300 transition ease-in-out focus:ring focus:outline-none">
            {image ? <img src={image} alt="Uploaded" className="h-full object-cover" /> : <span>Click to insert image</span>}
          </div>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} accept=".png,.jpg,.jpeg" />
        </div>
        <div className="desktop:w-1/2 phone:w-full flex flex-col gap-3">
          <h3 className="text-sm font-bold">Upload to</h3>
          <div className="flex w-full flex-col gap-3">
            {platforms.map(link => (
              <div key={link.id} onClick={() => handlePlatformClick(link.id)} className={`w-full h-14 flex justify-center items-center gap-2 cursor-pointer rounded-lg transition ease-in-out ${selectedPlatforms.includes(link.id) ? 'bg-secondary' : 'bg-grey hover:bg-gray-300'}`}>
                <img className="h-1/2" src={link.img} alt={link.platform} />
                <p className="phone:text-xs desktop:text-sm">{link.platform}</p>
              </div>
            ))}
          </div>
          <h3 className="text-sm font-bold">Schedule (Optional)</h3>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker disablePast label="Schedule your post" value={scheduleDate} onChange={setScheduleDate} />
          </LocalizationProvider>
        </div>
      </section>
      <Button onClick={handleSubmit}>Upload</Button>
    </main>
  );
};

export default AddPost;
