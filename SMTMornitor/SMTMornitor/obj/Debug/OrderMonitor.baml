   M S B A M L   `   `   `  ����F  BSMTMornitor, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null)clr-namespace:SMTMornitorSMTMornitor  5          SMTMornitor.OrderMonitor   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      +localclr-namespace:SMTMornitor     5        � DataContext  5      �� *	OrderVM+��5	      ��  �� Source# Zo� �� Path$ Width���5
      �� # Zo�$ Height� � 	Resources 5       �� MergedDictionaries �� Source�� 5   
    5      �� 5      $ Skins/MainSkin.xaml?�6%   6D   %    5      .��5      �  � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   � .+�5      �� $��
SMT ORDERS��6   $��24(�6*   
���� ��68   5      �� 5   
   $��1��6   $��10q�6    ��6,   �� *UnconfirmOrders+��5      �� 5       �� 
TargetType" ��6   .�5      ��  �� Property � ��	 �� Value$	 0q�68   �� 5        � ��	 5!      �� 5"      " ��6$   .�5$   "   ��  � |�	 .  6>   �� 5%   "    � ��$	 Stretch=�6O   �� 5&   "    � ��$	 Stretch=�6H   �� 5'   "    � ��$	 5q�6;   �� 5(   "    � ��$	 -1q�6<   �� 5)   "    � ��$	 Stretch=�6F   �� 5*   "    � ��$	 Stretch=�6M   5+      5-      5.      ��50      �� 51      .R�52      �� $��2q�6   ��53      �� *Reason+   TextColorCT
 �� 	Converter#
 [   �� ConverterParameter$ border��._�54      �  � ColumnDefinitions 55      �� 56   "   �� 57   "   �� 58   "   �� 59   "   $��3* �63   .+�5;      �� $��1q�6%   
�������._�5<   "   �� �� 5=      $�LINE:��6"    �� 5>      
�����F��6"   �� *LineInfo.Name+6A   5?   #   5@      �� 5A      $��1��6%   $��0,1,1,1q�65   
�������._�5B   "   �� �� 5C      $�MODEL:��6"    �� 5D      
�����F��6"   �� *Product.Name+6@   5E   #   5F      �� 5H      $��2��6%   $��0,1,1,1q�65   
�������._�5I   "   �� �� 5J      $�Amount:��6"    �� 5K      
�����F��6"   �� *Amount+6:   5L   #   5M      �� 5O      $��3��6%   $��0,1,1,1q�65   
�������._�5P   "   ��  �� Orientation$ 
Horizontal=�6-   .+�5Q   &   �� $��OK��6-   $��5q�6:   $	��120��6g   
 � Tag$ ok��5R   -    �� Click 5Q   E   �� *OnClickListener+��5S   -   �� *Reason+#
 [  $ ok���� 5T   &   $��JIG SHORTAGE��6-   $��5q�6f   $ jig-shortage��5U   -    5T   D   �� *OnClickListener+��5V   -   �� *Reason+#
 [  $ jig-shortage���� 5W   &   $��MGZ SHORTAGE��6-   $��5q�6f   $ magazin-shortage��5X   -    5W   D   �� *OnClickListener+��5Y   -   �� *Reason+#
 [  $ magazin-shortage���� 5Z   &   $��PLM WAITING��6-   $��5q�6e   $ plasma-waiting��5[   -    5Z   C   �� *OnClickListener+��5\   -   �� *Reason+#
 [  $ plasma-waiting���� 5]   &   $��PCB SHORTAGE��6-   $��5q�6f   $ pcb-shortage��5^   -    5]   D   �� *OnClickListener+��5_   -   �� *Reason+#
 [  $ pcb-shortage��5`   #   5a      5b      5c      5d      5f      r� 5g   
   -   5        $��myMediaElement��5g      $��3��6-    r� Source$ 
Melody.mp3?�6:   $y�	Collapsed=�6N    r� LoadedBehavior$ Manual=�5h   
    r� UnloadedBehavior$
 Stop=�6"    r� Stretch$
 Fill=�6:   5i      5j      