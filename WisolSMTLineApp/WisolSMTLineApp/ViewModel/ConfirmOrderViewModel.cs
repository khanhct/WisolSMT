﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using WisolSMTLineApp.Model;

namespace WisolSMTLineApp.ViewModel
{
    public class ConfirmOrderViewModel : BaseViewModel
    {
        int amount = Setting.DefaultLots;
        public int Amount
        {
            get { return amount; }
            set { amount = value; OnPropertyChanged(nameof(Amount)); }
        }
        public ObservableCollection<ProductionDtl> LstOrderNotFinish { get; set; } = new ObservableCollection<ProductionDtl>();
        public ConfirmOrderViewModel()
        {
            Api.Controller.getLstOrderNotFinish(Setting.SelectedLine.LineID)?.ForEach(x => LstOrderNotFinish.Add(x));
        }

        public void ConfirmOrder(object b)
        {
            object lockObject = new object();
            //Confirm to server
            var ProductionDtl = (ProductionDtl)b;
            lock (lockObject)
            {
                if (Api.Controller.ConfirmOrder(ProductionDtl))
                {
                    LstOrderNotFinish.Clear();
                    Api.Controller.getLstOrderNotFinish(Setting.SelectedLine.LineID)?.ForEach(x => LstOrderNotFinish.Add(x));
                    MessageBox.Show("Order Confirmed", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {
                    MessageBox.Show("Confirm order failed", "Failed", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        public void CreateOrder()
        {
            var ProductionDtl = new ProductionDtl()
            {
                Amount = Amount,
                FactoryID = 1,
                WorkingDate = App.TodayDate,
                ShiftID = App.CurrentShift,
                LineID = Setting.SelectedLine.LineID,
                ProductID = Setting.SelectedProduct.ID,
                Message = "WAITTING"
            };
            if (Api.Controller.CreateOrder(ProductionDtl))
            {
                LstOrderNotFinish.Clear();
                Api.Controller.getLstOrderNotFinish(Setting.SelectedLine.LineID)?.ForEach(x => LstOrderNotFinish.Add(x));
                MessageBox.Show("Create order successfully", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            else
                MessageBox.Show("Create order failed, something happened", "Failed", MessageBoxButton.OK, MessageBoxImage.Error);
        }

        private ICommand _submitCommand;
        public ICommand SubmitCommand
        {
            get
            {
                return _submitCommand ?? (_submitCommand = new CommandHandler(() => CreateOrder(), () => CanExecute));
            }
        }

        private ICommand _clickCommand;
        public ICommand ClickCommand
        {
            get
            {
                return _clickCommand ?? (_clickCommand = new CommandHandler((p) => ConfirmOrder(p), () => CanExecute));
            }
        }
        public bool CanExecute
        {
            get
            {
                return true;
            }
        }
    }
}